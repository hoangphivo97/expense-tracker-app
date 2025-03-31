import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as admin from 'firebase-admin';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            })
        })
    }

    async findByUid(uid: string) {
        return await this.userModel.findOne({ uid });
    }

    async createUser(userData: User) {
        const user = new this.userModel(userData);
        return await user.save();
    }

    generateJWT(user: User) {
        return this.jwtService.sign({ uid: user.uid, email: user.email })
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new BadRequestException("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password!);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password")
        }

        return user;
    }

    // Issue JWT token for the user after successful login
    async login(user: User) {
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            return user;  // Return user if credentials are valid
        }
        return null;  // Return null if no user found or password doesn't match
    }

    // Issue JWT token for the user after successful login
    async login(user: User) {
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

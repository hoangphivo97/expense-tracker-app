import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/DTO/login.dto';
import * as admin from 'firebase-admin';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    @Post('google-login')
    async googleLogin(@Body('token') token: string) {
        try {
            const result = await this.handleFirebaseLogin(token);
            return { message: 'Login success', ...result }
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }

    @Post('facebook-login')
    async facebookLogin(@Body('token') token: string) {
        try {
            const result = await this.handleFirebaseLogin(token);
            return { message: 'Login success', ...result }
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }

    private async handleFirebaseLogin(token: string): Promise<{ token: string; user: any }> {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken

        const userEmail = email ?? `no-email-${uid}@example.com`
        let user = await this.userService.findByUid(uid);;
        if (!user) {
            user = await this.userService.createUser({
                uid,
                email: userEmail,
                username: name ?? 'Unknown User',
                role: 'User'
            })
        }

        const authToken = this.userService.generateJWT(user);
        return { token: authToken, user }
    }
}

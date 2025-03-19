import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/DTO/login.dto';

@Controller('user')
export class LoginController {
    constructor(private readonly userService: UserService){

    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.userService.login(loginDto);
    }
}

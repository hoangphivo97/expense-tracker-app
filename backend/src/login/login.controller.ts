import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './DTO/login.dto';

@Controller('user')
export class LoginController {
    constructor(private readonly loginService: LoginService){

    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto){
        return this.loginService.login(loginUserDto);
    }
}

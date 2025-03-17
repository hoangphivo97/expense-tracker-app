import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './DTO/login.dto';

@Injectable()
export class LoginService {
    private readonly adminAccount = {username: "admin", password: "123456"}

    login(loginUserDro: LoginUserDto){
        const {userName, passWord} = loginUserDro;

        if(userName === this.adminAccount.username && passWord === this.adminAccount.password){
            return {message: "Login Successful!"}
        } else{
            return {message: "Invalid username or password"}
        }
    }
}

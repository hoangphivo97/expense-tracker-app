export interface LoginResponse {
    token: string;
}

export interface User extends LoginResponse {
    username: string;
    password: string
    role: string;
    email: string;
}
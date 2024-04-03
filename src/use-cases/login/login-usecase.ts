import { Login } from "./login-interface";

export class LoginUsecase implements Login {
    constructor(){}

    async login(email: string, password: string): Promise<string> {
        
    }
}
import { UserRepository } from "../ports/user-repository";
import { Signup } from "./signup-interface";

export class SignupUseCase implements Signup {
    constructor(private readonly repository: UserRepository){}
    
    async signup(email: string, password: string): Promise<void> {
        
    }
}
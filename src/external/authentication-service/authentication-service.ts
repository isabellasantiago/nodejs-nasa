import jwt from 'jsonwebtoken'
import { Authentication } from "../../use-cases/ports/authentitaction-service";

export class AuthenticationService implements Authentication {
    constructor(private readonly secret: string){}
    async generateToken(userEmail: string): Promise<string> {
        const token = jwt.sign({
            email: userEmail
        }, this.secret, { expiresIn: '72h' })

        return token
    }
}
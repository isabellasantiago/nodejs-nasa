
import bcrypt from 'bcrypt'
import { CryptPassword } from "../../use-cases/ports/crypt-password-service";

export class CryptPasswordService implements CryptPassword {
    
    async crypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        return passwordHash
    }

    async uncrypt(dbPassword: string, password: string): Promise<boolean> {
        const checkPassword = await bcrypt.compare(password, dbPassword)

        return checkPassword
    }
}
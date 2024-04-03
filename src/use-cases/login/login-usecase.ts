import { InvalidPasswordException } from "../errors-exceptions";
import { UserNotFoundException } from "../errors-exceptions/user-not-found-exception";
import { Authentication } from "../ports/authentitaction-service";
import { CryptPassword } from "../ports/crypt-password-service";
import { UserData } from "../ports/user-data";
import { UserRepository } from "../ports/user-repository";
import { ValidatorService } from "../ports/validator-service";
import { loginSchema } from "../validations";
import { Login } from "./login-interface";

export class LoginUsecase implements Login {
    constructor(
        private readonly repository: UserRepository,
        private readonly validator: ValidatorService,
        private readonly cryptService: CryptPassword,
        private readonly authenticator: Authentication
    ) { }

    async login(user: UserData): Promise<string> {
        const [_, exists] = await Promise.all([this.validator.validate(user, loginSchema), this.repository.findByEmail(user.email)])

        if (!exists) throw new UserNotFoundException()

        const isPassworValid = await this.cryptService.uncrypt(exists.password, user.password)

        if (!isPassworValid) throw new InvalidPasswordException()

        const token = await this.authenticator.generateToken(user.email)

        return token
    }
}
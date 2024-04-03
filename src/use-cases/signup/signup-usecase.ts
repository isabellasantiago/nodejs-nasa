import { UserAlreadyExistsException } from "../errors-exceptions/user-already-exists-exception";
import { CryptPassword } from "../ports/crypt-password-service";
import { UserData } from "../ports/user-data";
import { UserRepository } from "../ports/user-repository";
import { ValidatorService } from "../ports/validator-service";
import { signupSchema } from "../validations";
import { Signup } from "./signup-interface";

export class SignupUseCase implements Signup {
    constructor(
        private readonly repository: UserRepository,
        private readonly validator: ValidatorService,
        private readonly cryptService: CryptPassword
    ) { }

    async signup(user: UserData & { confirmPassowrd: string }): Promise<void> {
        const [_, exists] = await Promise.all([this.validator.validate(user, signupSchema), this.repository.findByEmail(user.email)])

        if (exists) throw new UserAlreadyExistsException()

        const passwordHash = await this.cryptService.crypt(user.password)

        await this.repository.create({ email: user.email, password: passwordHash })
    }
}
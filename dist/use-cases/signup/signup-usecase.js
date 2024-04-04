"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupUseCase = void 0;
const user_already_exists_exception_1 = require("../errors-exceptions/user-already-exists-exception");
const validations_1 = require("../validations");
class SignupUseCase {
    repository;
    validator;
    cryptService;
    constructor(repository, validator, cryptService) {
        this.repository = repository;
        this.validator = validator;
        this.cryptService = cryptService;
    }
    async signup(user) {
        const [_, exists] = await Promise.all([this.validator.validate(user, validations_1.signupSchema), this.repository.findByEmail(user.email)]);
        if (!!exists)
            throw new user_already_exists_exception_1.UserAlreadyExistsException();
        const passwordHash = await this.cryptService.crypt(user.password);
        await this.repository.create({ email: user.email, password: passwordHash });
    }
}
exports.SignupUseCase = SignupUseCase;

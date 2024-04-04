"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsecase = void 0;
const errors_exceptions_1 = require("../errors-exceptions");
const user_not_found_exception_1 = require("../errors-exceptions/user-not-found-exception");
const validations_1 = require("../validations");
class LoginUsecase {
    repository;
    validator;
    cryptService;
    authenticator;
    constructor(repository, validator, cryptService, authenticator) {
        this.repository = repository;
        this.validator = validator;
        this.cryptService = cryptService;
        this.authenticator = authenticator;
    }
    async login(user) {
        const [_, exists] = await Promise.all([this.validator.validate(user, validations_1.loginSchema), this.repository.findByEmail(user.email)]);
        if (!exists)
            throw new user_not_found_exception_1.UserNotFoundException();
        const isPassworValid = await this.cryptService.uncrypt(exists.password, user.password);
        if (!isPassworValid)
            throw new errors_exceptions_1.InvalidPasswordException();
        const token = await this.authenticator.generateToken(user.email);
        return token;
    }
}
exports.LoginUsecase = LoginUsecase;

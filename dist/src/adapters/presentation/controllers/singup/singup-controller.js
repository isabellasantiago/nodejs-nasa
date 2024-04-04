"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = void 0;
const errors_exceptions_1 = require("../../../../use-cases/errors-exceptions");
const user_already_exists_exception_1 = require("../../../../use-cases/errors-exceptions/user-already-exists-exception");
const http_helper_1 = require("../helpers/http-helper");
class SignupController {
    usecase;
    constructor(usecase) {
        this.usecase = usecase;
    }
    async handle(httpRequest) {
        try {
            await this.usecase.signup(httpRequest.body);
            return (0, http_helper_1.successNoContent)();
        }
        catch (error) {
            if (error instanceof user_already_exists_exception_1.UserAlreadyExistsException)
                return (0, http_helper_1.conflictRequest)(error);
            if (error instanceof errors_exceptions_1.ValidateException)
                return (0, http_helper_1.badRequest)(error);
            return (0, http_helper_1.serverError)(error);
        }
    }
}
exports.SignupController = SignupController;

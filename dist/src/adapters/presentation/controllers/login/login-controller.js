"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const errors_exceptions_1 = require("../../../../use-cases/errors-exceptions");
const http_helper_1 = require("../helpers/http-helper");
class LoginController {
    usecase;
    constructor(usecase) {
        this.usecase = usecase;
    }
    async handle(httpRequest) {
        try {
            const token = await this.usecase.login(httpRequest.body);
            return (0, http_helper_1.ok)(token);
        }
        catch (error) {
            if (error instanceof errors_exceptions_1.UserNotFoundException)
                return (0, http_helper_1.notFoundRequest)(error);
            if (error instanceof errors_exceptions_1.ValidateException || error instanceof errors_exceptions_1.InvalidPasswordException)
                return (0, http_helper_1.badRequest)(error);
            return (0, http_helper_1.serverError)(error);
        }
    }
}
exports.LoginController = LoginController;

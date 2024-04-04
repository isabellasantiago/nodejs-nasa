"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const login_controller_1 = require("./login-controller");
const errors_exceptions_1 = require("../../../../use-cases/errors-exceptions");
const httpRequest = { body: { email: 'fake@gmail.com', password: '12345678' } };
(0, vitest_1.describe)('Login Controller', () => {
    let usecase;
    let controller;
    (0, vitest_1.beforeEach)(() => {
        usecase = {
            login: vitest_1.vi.fn()
        };
        controller = new login_controller_1.LoginController(usecase);
    });
    (0, vitest_1.it)('should return 404 when user not found', async () => {
        vitest_1.vi.spyOn(usecase, 'login').mockRejectedValueOnce(new errors_exceptions_1.UserNotFoundException());
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(response.body).toBe("User Not Found");
    });
    (0, vitest_1.it)('should return 400 when ValidateException', async () => {
        vitest_1.vi.spyOn(usecase, 'login').mockRejectedValueOnce(new errors_exceptions_1.ValidateException('Invalid Email', { name: 'email' }));
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body).toBe("Invalid Email");
    });
    (0, vitest_1.it)('should return 400 when InvalidPasswordException', async () => {
        vitest_1.vi.spyOn(usecase, 'login').mockRejectedValueOnce(new errors_exceptions_1.InvalidPasswordException());
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body).toBe("Invalid password");
    });
    (0, vitest_1.it)('should return 500 when any errors occurs', async () => {
        vitest_1.vi.spyOn(usecase, 'login').mockRejectedValueOnce(new Error("error"));
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(500);
        (0, vitest_1.expect)(response.body).toBe("error");
    });
    (0, vitest_1.it)('should return 200 when success', async () => {
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const singup_controller_1 = require("./singup-controller");
const errors_exceptions_1 = require("../../../../use-cases/errors-exceptions");
const httpRequest = { body: { email: 'fake@gmail.com', password: '12345678', confirmPassword: '12345678' } };
(0, vitest_1.describe)('Signup Controller', () => {
    let usecase;
    let controller;
    (0, vitest_1.beforeEach)(() => {
        usecase = {
            signup: vitest_1.vi.fn()
        };
        controller = new singup_controller_1.SignupController(usecase);
    });
    (0, vitest_1.it)('should return 409 when user already exists', async () => {
        vitest_1.vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new errors_exceptions_1.UserAlreadyExistsException());
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(409);
        (0, vitest_1.expect)(response.body).toBe("User Already Exists");
    });
    (0, vitest_1.it)('should return 400 when ValidateException', async () => {
        vitest_1.vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new errors_exceptions_1.ValidateException('Invalid Email', { name: 'email' }));
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body).toBe("Invalid Email");
    });
    (0, vitest_1.it)('should return 500 when any errors occurs', async () => {
        vitest_1.vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new Error("error"));
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(500);
        (0, vitest_1.expect)(response.body).toBe("error");
    });
    (0, vitest_1.it)('should return 204 when success', async () => {
        const response = await controller.handle(httpRequest);
        (0, vitest_1.expect)(response.statusCode).toBe(204);
    });
});

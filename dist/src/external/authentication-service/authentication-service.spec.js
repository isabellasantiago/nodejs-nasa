"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const authentication_service_1 = require("./authentication-service");
(0, vitest_1.describe)('Authentication Service', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new authentication_service_1.AuthenticationService('mysecret');
    });
    (0, vitest_1.it)('should generate a token', async () => {
        const token = await service.generateToken('isa@yopmail.com');
        (0, vitest_1.expect)(token).toBeTypeOf('string');
    });
});

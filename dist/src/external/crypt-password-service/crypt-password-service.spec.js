"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const crypt_passoword_service_1 = require("./crypt-passoword-service");
(0, vitest_1.describe)('Crypt Password Service', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new crypt_passoword_service_1.CryptPasswordService();
    });
    (0, vitest_1.describe)('crypt', () => {
        (0, vitest_1.it)('should encrypt the password', async () => {
            const password = 'password123';
            const result = await service.crypt(password);
            (0, vitest_1.expect)(result).not.toEqual(password);
        });
    });
    (0, vitest_1.describe)('uncrypt', () => {
        (0, vitest_1.it)('should compare the passwords and return true if they match', async () => {
            const password = 'password123';
            const dbPassword = await service.crypt(password);
            const result = await service.uncrypt(dbPassword, password);
            (0, vitest_1.expect)(result).toEqual(true);
        });
        (0, vitest_1.it)('should compare the passwords and return false if they do not match', async () => {
            const dbPassword = 'hashedpassword';
            const password = 'wrongpassword';
            const result = await service.uncrypt(dbPassword, password);
            (0, vitest_1.expect)(result).toEqual(false);
        });
    });
});

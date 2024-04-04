"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const login_usecase_1 = require("./login-usecase");
const errors_exceptions_1 = require("../errors-exceptions");
const external_1 = require("../../external");
(0, vitest_1.describe)('Login - Use Case', () => {
    let repository;
    let validator;
    let cryptService;
    let authenticator;
    let usecase;
    (0, vitest_1.beforeEach)(() => {
        repository = {
            findByEmail: vitest_1.vi.fn().mockResolvedValue({
                email: 'isa@gmail.com',
                password: '12312xasdas'
            }),
            create: vitest_1.vi.fn(),
        };
        validator = new external_1.Validator();
        cryptService = {
            crypt: vitest_1.vi.fn(),
            uncrypt: vitest_1.vi.fn().mockResolvedValue(true)
        };
        authenticator = {
            generateToken: vitest_1.vi.fn().mockResolvedValue('faketoken')
        };
        usecase = new login_usecase_1.LoginUsecase(repository, validator, cryptService, authenticator);
    });
    (0, vitest_1.it)('should throw UserNotFoundException when user not found', async () => {
        vitest_1.vi.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
        try {
            await usecase.login({ email: 'email@mail.com', password: '12312xasdas' });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.UserNotFoundException);
        }
    });
    (0, vitest_1.it)('should throw InvalidPasswordException when password does not match', async () => {
        vitest_1.vi.spyOn(cryptService, 'uncrypt').mockResolvedValue(false);
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: '12312312xasdas1s'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.InvalidPasswordException);
        }
    });
    (0, vitest_1.it)('should throw ValidateException when email is invalid', async () => {
        try {
            await usecase.login({
                email: 'isa@yopmail.com',
                password: '12312xasdas'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Invalid email');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when email not provided', async () => {
        try {
            await usecase.login({
                email: '',
                password: '12312xasdas'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Email is required');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when password have less than 8 characters', async () => {
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: '12'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('At least 8 characters');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when password not provided', async () => {
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: null
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Password is required');
        }
    });
    (0, vitest_1.it)('should return token when success', async () => {
        const token = await usecase.login({
            email: 'isa@yopmail.com',
            password: '12312xasdas'
        });
        (0, vitest_1.expect)(token).toBeTypeOf('string');
    });
});

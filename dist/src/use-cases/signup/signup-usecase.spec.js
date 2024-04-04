"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const signup_usecase_1 = require("./signup-usecase");
const errors_exceptions_1 = require("../errors-exceptions");
const external_1 = require("../../external");
(0, vitest_1.describe)('Login - Use Case', () => {
    let repository;
    let validator;
    let cryptService;
    let usecase;
    (0, vitest_1.beforeEach)(() => {
        repository = {
            findByEmail: vitest_1.vi.fn(),
            create: vitest_1.vi.fn(),
        };
        validator = new external_1.Validator();
        cryptService = {
            crypt: vitest_1.vi.fn(),
            uncrypt: vitest_1.vi.fn()
        };
        usecase = new signup_usecase_1.SignupUseCase(repository, validator, cryptService);
    });
    (0, vitest_1.it)('should throw UserAlreadyExistsException when user not found', async () => {
        try {
            await usecase.signup({ email: 'isa@gmail.com', password: '12312xasdas', confirmPassword: '12312xasdas' });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.UserAlreadyExistsException);
        }
    });
    (0, vitest_1.it)('should throw ValidateException when email is invalid', async () => {
        vitest_1.vi.spyOn(repository, 'findByEmail').mockResolvedValue(null);
        try {
            await usecase.signup({
                email: 'isa123@yopmail.com',
                password: '12312xasdas',
                confirmPassword: '12312xasdas'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Invalid email');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when email not provided', async () => {
        try {
            await usecase.signup({
                email: '',
                password: '12312xasdas',
                confirmPassword: '12312xasdas'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Email is required');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when password have less than 8 characters', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12',
                confirmPassword: '12'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('At least 8 characters');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when confirmpassword have less than 8 characters', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasda',
                confirmPassword: '12312xasda'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('At least 8 characters');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when confirmpassword not provided', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasdas',
                confirmPassword: null
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Please confirm your password');
        }
    });
    (0, vitest_1.it)('should throw ValidateException when confirmpassword does not match wit password', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasdas',
                confirmPassword: '12312xasdasss'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeInstanceOf(errors_exceptions_1.ValidateException);
            (0, vitest_1.expect)(error.message).toBe('Passwords must match');
        }
    });
    (0, vitest_1.it)('should return token when success', async () => {
        try {
            await usecase.signup({
                email: 'isa3321231@gmail.com',
                password: '12345678',
                confirmPassword: '12345678'
            });
        }
        catch (error) {
            (0, vitest_1.expect)(error).toBeUndefined();
        }
    });
});

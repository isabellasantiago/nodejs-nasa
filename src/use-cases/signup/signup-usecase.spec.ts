import { vi, describe, it, expect, beforeEach } from 'vitest'
import { CryptPassword, UserRepository, ValidatorService } from '../ports'
import { SignupUseCase } from './signup-usecase'
import { UserAlreadyExistsException, ValidateException } from '../errors-exceptions'
import { Validator } from '../../external'


describe('Login - Use Case', () => {
    let repository: UserRepository
    let validator: ValidatorService
    let cryptService: CryptPassword
    let usecase: SignupUseCase

    beforeEach(() => {
        repository = {
            findByEmail: vi.fn(),
            create: vi.fn(),
        }

        validator = new Validator()

        cryptService = {
            crypt: vi.fn(),
            uncrypt: vi.fn()
        }

        usecase = new SignupUseCase(repository, validator, cryptService)
    })

    it('should throw UserAlreadyExistsException when user not found', async () => {
        try {
            await usecase.signup({ email: 'isa@gmail.com', password: '12312xasdas', confirmPassword: '12312xasdas' })
        } catch (error) {
            expect(error).toBeInstanceOf(UserAlreadyExistsException)
        }
    })

    it('should throw ValidateException when email is invalid', async () => {
        vi.spyOn(repository, 'findByEmail').mockResolvedValue(null)
        try {
            await usecase.signup({
                email: 'isa123@yopmail.com',
                password: '12312xasdas',
                confirmPassword: '12312xasdas'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Invalid email')
        }
    })

    it('should throw ValidateException when email not provided', async () => {
        try {
            await usecase.signup({
                email: '',
                password: '12312xasdas',
                confirmPassword: '12312xasdas'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Email is required')
        }
    })

    it('should throw ValidateException when password have less than 8 characters', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12',
                confirmPassword: '12'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('At least 8 characters')
        }
    })

    it('should throw ValidateException when confirmpassword have less than 8 characters', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasda',
                confirmPassword: '12312xasda'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('At least 8 characters')
        }
    })

    it('should throw ValidateException when confirmpassword not provided', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasdas',
                confirmPassword: null as any
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Please confirm your password')
        }
    })

    it('should throw ValidateException when confirmpassword does not match wit password', async () => {
        try {
            await usecase.signup({
                email: 'isa@gmail.com',
                password: '12312xasdas',
                confirmPassword: '12312xasdasss'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Passwords must match')
        }
    })

    it('should return token when success', async () => {
        try {
            await usecase.signup({
                email: 'isa3321231@gmail.com',
                password: '12345678',
                confirmPassword: '12345678'
            })
            
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
})
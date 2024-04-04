import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Authentication, CryptPassword, UserRepository, ValidatorService } from '../ports'
import { LoginUsecase } from './login-usecase'
import { InvalidPasswordException, UserNotFoundException, ValidateException } from '../errors-exceptions'
import { Validator } from '../../external'


describe('Login - Use Case', () => {
    let repository: UserRepository
    let validator: ValidatorService
    let cryptService: CryptPassword
    let authenticator: Authentication
    let usecase: LoginUsecase

    beforeEach(() => {
        repository = {
            findByEmail: vi.fn().mockResolvedValue({
                email: 'isa@gmail.com',
                password: '12312xasdas'
            }),
            create: vi.fn(),
        }

        validator = new Validator()

        cryptService = {
            crypt: vi.fn(),
            uncrypt: vi.fn().mockResolvedValue(true)
        }

        authenticator = {
            generateToken: vi.fn().mockResolvedValue('faketoken')
        }

        usecase = new LoginUsecase(repository, validator, cryptService, authenticator)
    })

    it('should throw UserNotFoundException when user not found', async () => {
        vi.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null)
        try {
            await usecase.login({ email: 'email@mail.com', password: '12312xasdas' })
        } catch (error) {
            expect(error).toBeInstanceOf(UserNotFoundException)
        }
    })

    it('should throw InvalidPasswordException when password does not match', async () => {
        vi.spyOn(cryptService, 'uncrypt').mockResolvedValue(false)
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: '12312312xasdas1s'
            })
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordException)
        }
    })

    it('should throw ValidateException when email is invalid', async () => {
        try {
            await usecase.login({
                email: 'isa@yopmail.com',
                password: '12312xasdas'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Invalid email')
        }
    })

    it('should throw ValidateException when email not provided', async () => {
        try {
            await usecase.login({
                email: '',
                password: '12312xasdas'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Email is required')
        }
    })

    it('should throw ValidateException when password have less than 8 characters', async () => {
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: '12'
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('At least 8 characters')
        }
    })

    it('should throw ValidateException when password not provided', async () => {
        try {
            await usecase.login({
                email: 'isa@gmail.com',
                password: null as any
            })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidateException)
            expect(error.message).toBe('Password is required')
        }
    })

    it('should return token when success', async () => {
        const token = await usecase.login({
            email: 'isa@yopmail.com',
            password: '12312xasdas'
        })

        expect(token).toBeTypeOf('string')
    })
})
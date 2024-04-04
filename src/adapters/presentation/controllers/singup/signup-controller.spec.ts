import { vi, expect, beforeEach, describe, it } from 'vitest'
import { Signup } from '../../../../use-cases/signup/signup-interface'
import { SignupController } from './singup-controller'
import { InvalidPasswordException, UserAlreadyExistsException, ValidateException } from '../../../../use-cases/errors-exceptions'

const httpRequest = { body: { email: 'fake@gmail.com', password: '12345678', confirmPassword: '12345678' } }
describe('Signup Controller', () => {
    let usecase: Signup
    let controller: SignupController

    beforeEach(() => {
        usecase = {
            signup: vi.fn()
        }

        controller = new SignupController(usecase)
    })

    it('should return 409 when user already exists', async () => {
        vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new UserAlreadyExistsException())

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(409)
        expect(response.body).toBe("User Already Exists")
    })

    it('should return 400 when ValidateException', async () => {
        vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new ValidateException('Invalid Email', { name: 'email'}))

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(400)
        expect(response.body).toBe("Invalid Email")
    })

    it('should return 500 when any errors occurs', async () => {
        vi.spyOn(usecase, 'signup').mockRejectedValueOnce(new Error("error"))

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(500)
        expect(response.body).toBe("error")
    })

    
    it('should return 204 when success', async () => {
        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(204)
    })
})
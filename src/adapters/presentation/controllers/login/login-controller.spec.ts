import { vi, expect, beforeEach, describe, it } from 'vitest'
import { Login } from '../../../../use-cases/login/login-interface'
import { LoginController } from './login-controller'
import { InvalidPasswordException, UserNotFoundException, ValidateException } from '../../../../use-cases/errors-exceptions'

const httpRequest = { body: { email: 'fake@gmail.com', password: '12345678' } }
describe('Login Controller', () => {
    let usecase: Login
    let controller: LoginController

    beforeEach(() => {
        usecase = {
            login: vi.fn()
        }

        controller = new LoginController(usecase)
    })

    it('should return 404 when user not found', async () => {
        vi.spyOn(usecase, 'login').mockRejectedValueOnce(new UserNotFoundException())

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(404)
        expect(response.body).toBe("User Not Found")
    })

    it('should return 400 when ValidateException', async () => {
        vi.spyOn(usecase, 'login').mockRejectedValueOnce(new ValidateException('Invalid Email', { name: 'email'}))

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(400)
        expect(response.body).toBe("Invalid Email")
    })

    it('should return 400 when InvalidPasswordException', async () => {
        vi.spyOn(usecase, 'login').mockRejectedValueOnce(new InvalidPasswordException())

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(400)
        expect(response.body).toBe("Invalid password")
    })

    it('should return 500 when any errors occurs', async () => {
        vi.spyOn(usecase, 'login').mockRejectedValueOnce(new Error("error"))

        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(500)
        expect(response.body).toBe("error")
    })

    it('should return 200 when success', async () => {
        const response = await controller.handle(httpRequest)

        expect(response.statusCode).toBe(200)
    })
})
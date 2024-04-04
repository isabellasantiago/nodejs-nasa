import { vi, describe, it, expect, beforeEach } from 'vitest'
import { AuthenticationService } from './authentication-service'

describe('Authentication Service', () => {
    let service: AuthenticationService

    beforeEach(() => {
        service = new AuthenticationService('mysecret')
    })

    it('should generate a token', async () => {
        const token = await service.generateToken('isa@yopmail.com')

        expect(token).toBeTypeOf('string')
    })
})
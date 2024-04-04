import { describe, it, expect, beforeEach } from 'vitest'
import { CryptPasswordService } from './crypt-passoword-service'

describe('Crypt Password Service', () => {
    let service: CryptPasswordService;

    beforeEach(() => {
        service = new CryptPasswordService();
    });

    describe('crypt', () => {
        it('should encrypt the password', async () => {
            const password = 'password123';

            const result = await service.crypt(password);

            expect(result).not.toEqual(password);
        });
    });

    describe('uncrypt', () => {
        it('should compare the passwords and return true if they match', async () => {
            const password = 'password123';

            const dbPassword = await service.crypt(password)
            const result = await service.uncrypt(dbPassword, password);

            expect(result).toEqual(true);
        });

        it('should compare the passwords and return false if they do not match', async () => {
            const dbPassword = 'hashedpassword';
            const password = 'wrongpassword';

            const result = await service.uncrypt(dbPassword, password);

            expect(result).toEqual(false);
        });
    });
});

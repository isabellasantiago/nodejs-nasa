import * as yup from 'yup';
import { describe, it, expect, beforeEach } from 'vitest'
import { Validator } from './validator-service';
import { ValidateException } from '../../use-cases/errors-exceptions';

describe('Validator', () => {
    let validator: Validator;

    beforeEach(() => {
        validator = new Validator();
    });

    it('should validate data against schema', async () => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            age: yup.number().required().positive().integer(),
            email: yup.string().email(),
        });
        const data = {
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };
        await expect(validator.validate(data, schema)).resolves.toBeUndefined();
    });

    it('should throw ValidateException if validation fails', async () => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            age: yup.number().required().positive().integer(),
            email: yup.string().email(),
        });
        const data = {
            name: 'John Doe',
            age: 'not a number',
            email: 'invalid email',
        };
        await expect(validator.validate(data, schema)).rejects.toThrowError(ValidateException);
    });
});

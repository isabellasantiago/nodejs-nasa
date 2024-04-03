import * as yup from 'yup';
import { ValidatorService } from "../../use-cases/ports/validator-service";
import { ValidateException } from '../../use-cases/errors-exceptions';


export class Validator implements ValidatorService {

    async validate(data: any, schema: any): Promise<void> {
        try {
            await schema.validate(data)
        }
        catch (err) {
            if (err instanceof yup.ValidationError) {
                const errors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message
                    }
                })
                throw new ValidateException(err.message, errors)
            }
        }
    }
}
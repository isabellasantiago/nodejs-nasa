import { ValidateException } from "../../../../use-cases/errors-exceptions";
import { UserAlreadyExistsException } from "../../../../use-cases/errors-exceptions/user-already-exists-exception";
import { UserData } from "../../../../use-cases/ports/user-data";
import { Signup } from "../../../../use-cases/signup/signup-interface";
import { badRequest, conflictRequest, serverError, successNoContent } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../ports";

export class SignupController  implements Controller {
    constructor(private readonly usecase: Signup){}
    
    async handle(httpRequest: HttpRequest<UserData & {confirmPassowrd: string}>): Promise<HttpResponse> {
        try {
            await this.usecase.signup(httpRequest.body)

            return successNoContent()
        } catch (error: any) {
            if(error instanceof UserAlreadyExistsException) return conflictRequest(error)

            if(error instanceof ValidateException) return badRequest(error)

            return serverError(error)
        }
    }
}
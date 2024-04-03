import { Login } from "../../../../use-cases/login/login-interface";
import { UserData } from "../../../../use-cases/ports/user-data";
import { Controller, HttpRequest, HttpResponse } from "../ports";
import { InvalidPasswordException, UserNotFoundException, ValidateException } from "../../../../use-cases/errors-exceptions";
import { badRequest, notFoundRequest, ok, serverError } from "../helpers/http-helper";

export class LoginController implements Controller {
    constructor(private readonly usecase: Login){}
    
    async handle(httpRequest: HttpRequest<UserData>): Promise<HttpResponse> {
        try {
            const token = await this.usecase.login(httpRequest.body)

            return ok(token)
        } catch (error: any) {
            if(error instanceof UserNotFoundException) return notFoundRequest(error)

            if(error instanceof ValidateException || error instanceof InvalidPasswordException) return badRequest(error)

            return serverError(error)
        }
    }
}
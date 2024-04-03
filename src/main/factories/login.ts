import client from "../../../prisma/client";
import { LoginController } from "../../adapters/presentation/controllers/login/login-controller";

import { CryptPasswordService, PrismaUserRepository, Validator } from "../../external"
import { AuthenticationService } from "../../external/authentication-service/authentication-service";
import { LoginUsecase } from "../../use-cases/login/login-usecase";
import { envs } from "../config/envs";


export const makeLoginController = (): LoginController => {
    const db = new PrismaUserRepository(client)
    const validator = new Validator()
    const cryptService = new CryptPasswordService()
    const authenticator = new AuthenticationService(envs.secret_jwt_key)
    const usecase = new LoginUsecase(db, validator, cryptService, authenticator)
    const controller = new LoginController(usecase)

    return controller
}
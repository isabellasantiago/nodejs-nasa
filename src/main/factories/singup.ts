import client from "../../../prisma/client";
import { SignupController } from "../../adapters/presentation/controllers/singup/singup-controller";
import { CryptPasswordService, PrismaUserRepository, Validator } from "../../external"
import { SignupUseCase } from "../../use-cases/signup/signup-usecase";

export const makeSignupController = (): SignupController => {
    const db = new PrismaUserRepository(client)
    const validator = new Validator()
    const cryptService = new CryptPasswordService()
    const usecase = new SignupUseCase(db, validator, cryptService)
    const controller = new SignupController(usecase)

    return controller
}
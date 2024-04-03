import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSignupController } from "../factories/singup";

export default (router: Router) => {
    router.post('/', adaptRoute(makeSignupController()))
}
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoginController } from "../factories/login";

export default function (router: Router) {
    router.post('/login', adaptRoute(makeLoginController()))
}
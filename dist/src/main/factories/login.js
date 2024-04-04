"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const client_1 = __importDefault(require("../../../prisma/client"));
const login_controller_1 = require("../../adapters/presentation/controllers/login/login-controller");
const external_1 = require("../../external");
const authentication_service_1 = require("../../external/authentication-service/authentication-service");
const login_usecase_1 = require("../../use-cases/login/login-usecase");
const envs_1 = require("../config/envs");
const makeLoginController = () => {
    const db = new external_1.PrismaUserRepository(client_1.default);
    const validator = new external_1.Validator();
    const cryptService = new external_1.CryptPasswordService();
    const authenticator = new authentication_service_1.AuthenticationService(envs_1.envs.secret_jwt_key);
    const usecase = new login_usecase_1.LoginUsecase(db, validator, cryptService, authenticator);
    const controller = new login_controller_1.LoginController(usecase);
    return controller;
};
exports.makeLoginController = makeLoginController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignupController = void 0;
const client_1 = __importDefault(require("../../../prisma/client"));
const singup_controller_1 = require("../../adapters/presentation/controllers/singup/singup-controller");
const external_1 = require("../../external");
const signup_usecase_1 = require("../../use-cases/signup/signup-usecase");
const makeSignupController = () => {
    const db = new external_1.PrismaUserRepository(client_1.default);
    const validator = new external_1.Validator();
    const cryptService = new external_1.CryptPasswordService();
    const usecase = new signup_usecase_1.SignupUseCase(db, validator, cryptService);
    const controller = new singup_controller_1.SignupController(usecase);
    return controller;
};
exports.makeSignupController = makeSignupController;

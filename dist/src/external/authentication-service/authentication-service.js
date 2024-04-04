"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationService {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    async generateToken(userEmail) {
        const token = jsonwebtoken_1.default.sign({
            email: userEmail
        }, this.secret, { expiresIn: '72h' });
        return token;
    }
}
exports.AuthenticationService = AuthenticationService;

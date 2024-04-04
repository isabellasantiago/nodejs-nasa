"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptPasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CryptPasswordService {
    async crypt(password) {
        const salt = await bcrypt_1.default.genSalt(12);
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        return passwordHash;
    }
    async uncrypt(dbPassword, password) {
        const checkPassword = await bcrypt_1.default.compare(password, dbPassword);
        return checkPassword;
    }
}
exports.CryptPasswordService = CryptPasswordService;

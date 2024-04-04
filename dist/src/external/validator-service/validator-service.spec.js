"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const vitest_1 = require("vitest");
const validator_service_1 = require("./validator-service");
const errors_exceptions_1 = require("../../use-cases/errors-exceptions");
(0, vitest_1.describe)('Validator', () => {
    let validator;
    (0, vitest_1.beforeEach)(() => {
        validator = new validator_service_1.Validator();
    });
    (0, vitest_1.it)('should validate data against schema', async () => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            age: yup.number().required().positive().integer(),
            email: yup.string().email(),
        });
        const data = {
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };
        await (0, vitest_1.expect)(validator.validate(data, schema)).resolves.toBeUndefined();
    });
    (0, vitest_1.it)('should throw ValidateException if validation fails', async () => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            age: yup.number().required().positive().integer(),
            email: yup.string().email(),
        });
        const data = {
            name: 'John Doe',
            age: 'not a number',
            email: 'invalid email',
        };
        await (0, vitest_1.expect)(validator.validate(data, schema)).rejects.toThrowError(errors_exceptions_1.ValidateException);
    });
});

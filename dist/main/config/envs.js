"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
exports.envs = {
    port: process.env.PORT ?? '8081',
    secret_jwt_key: process.env.JWT_SECRET_KEY ?? 'mysecret'
};

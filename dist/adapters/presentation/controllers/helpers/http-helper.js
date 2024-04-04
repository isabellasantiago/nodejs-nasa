"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.ok = exports.badRequest = exports.conflictRequest = exports.forbidden = exports.successNoContent = exports.okCreated = exports.notFoundRequest = void 0;
const notFoundRequest = (error) => ({
    statusCode: 404,
    body: error.message
});
exports.notFoundRequest = notFoundRequest;
const okCreated = (data) => ({
    body: data,
    statusCode: 201
});
exports.okCreated = okCreated;
const successNoContent = () => ({
    statusCode: 204
});
exports.successNoContent = successNoContent;
const forbidden = (error) => ({
    statusCode: 403,
    body: error.message
});
exports.forbidden = forbidden;
const conflictRequest = (error) => ({
    statusCode: 409,
    body: error.message
});
exports.conflictRequest = conflictRequest;
const badRequest = (error) => ({
    statusCode: 400,
    body: error.message
});
exports.badRequest = badRequest;
const ok = (data) => ({
    statusCode: 200,
    body: data
});
exports.ok = ok;
const serverError = (error) => ({
    statusCode: 500,
    body: error.message
});
exports.serverError = serverError;

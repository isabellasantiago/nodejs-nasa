"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateException = void 0;
class ValidateException extends Error {
    details;
    constructor(message, details) {
        super(message);
        this.name = 'ValidateException';
        this.details = details;
    }
}
exports.ValidateException = ValidateException;

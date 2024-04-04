"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordException = void 0;
class InvalidPasswordException extends Error {
    constructor(message) {
        super(message || "Invalid password");
        this.name = "InvalidPasswordException";
        Object.setPrototypeOf(this, InvalidPasswordException.prototype);
    }
}
exports.InvalidPasswordException = InvalidPasswordException;

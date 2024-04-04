"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
class UserAlreadyExistsException extends Error {
    constructor(message) {
        super(message || "User Already Exists");
        this.name = "UserAlreadyExistsException";
        Object.setPrototypeOf(this, UserAlreadyExistsException.prototype);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor(message) {
        super(message || "User Not Found");
        this.name = "UserNotFoundException";
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}
exports.UserNotFoundException = UserNotFoundException;

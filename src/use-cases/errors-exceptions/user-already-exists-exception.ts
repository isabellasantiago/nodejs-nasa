export class UserAlreadyExistsException extends Error {
    constructor(message?: string) {
        super(message || "User Already Exists")
        this.name = "UserAlreadyExistsException"

        Object.setPrototypeOf(this, UserAlreadyExistsException.prototype)
    }
}
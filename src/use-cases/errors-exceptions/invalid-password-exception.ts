export class InvalidPasswordException extends Error {
    constructor(message?: string) {
        super(message || "Invalid password")
        this.name = "InvalidPasswordException"

        Object.setPrototypeOf(this, InvalidPasswordException.prototype)
    }
}
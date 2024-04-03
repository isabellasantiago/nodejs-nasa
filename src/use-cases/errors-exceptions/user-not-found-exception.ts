export class UserNotFoundException extends Error {
    constructor(message?: string) {
        super(message || "User Not Found")
        this.name = "UserNotFoundException"

        Object.setPrototypeOf(this, UserNotFoundException.prototype)
    }
}
import { UserData } from "../ports/user-data";

export interface Signup {
    signup(user: UserData & { confirmPassword: string }): Promise<void>
}
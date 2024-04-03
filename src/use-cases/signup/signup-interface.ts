import { UserData } from "../ports/user-data";

export interface Signup {
    signup(user: UserData & { confirmPassowrd: string }): Promise<void>
}
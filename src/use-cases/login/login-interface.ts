import { UserData } from "../ports/user-data";

export interface Login {
    login(user: UserData): Promise<string>
}
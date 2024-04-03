import { UserData } from "./user-data"

export interface UserRepository {
    create(user: UserData): Promise<void>
    findByEmail(email: string): Promise<UserData | null>
}
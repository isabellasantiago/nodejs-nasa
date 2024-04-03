export interface UserRepository {
    create(email: string, password: string): Promise<void>
    findByEmail(email: string): Promise<void>
}
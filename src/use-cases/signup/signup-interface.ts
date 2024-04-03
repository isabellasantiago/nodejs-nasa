export interface Signup {
    signup(email: string, password: string): Promise<void>
}
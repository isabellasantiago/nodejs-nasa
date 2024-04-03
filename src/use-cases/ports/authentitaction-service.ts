export interface Authentication {
    generateToken(userEmail: string): Promise<string>
}
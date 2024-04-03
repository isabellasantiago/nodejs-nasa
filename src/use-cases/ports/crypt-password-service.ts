export interface CryptPassword {
    crypt(password: string): Promise<string>
    uncrypt(dbPassword: string, password: string): Promise<boolean>
}
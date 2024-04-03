import { PrismaClient } from "@prisma/client";
import { UserData } from "../../use-cases/ports/user-data";
import { UserRepository } from "../../use-cases/ports/user-repository";

export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient){}
    
    async create(user: UserData): Promise<void> {
        await this.prisma.user.create({
            data: { ...user }
        })
    }

    async findByEmail(email: string): Promise<UserData | null> {
        return await this.prisma.user.findFirst({
            where: { email }
        })
    }
}
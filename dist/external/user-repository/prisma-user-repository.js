"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        await this.prisma.user.create({
            data: { ...user }
        });
    }
    async findByEmail(email) {
        return await this.prisma.user.findFirst({
            where: { email }
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;

import "dotenv/config"
import { PrismaClient } from "../generated/prisma"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
})

export const prismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient
}

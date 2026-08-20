import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, authorId: string) {
    return prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        createdAt: data.createdAt,
        amount: data.amount,
        category: data.category,
        authorId: authorId
      }
    })
  }
}
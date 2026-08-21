import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, authorId: string) {
    return prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date,
        authorId: authorId
      }
    })
  }

  async listTransactions() {
    return prismaClient.transaction.findMany()
  }

  async deleteTransaction(id: string) {
    const findTransaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      }
    })
    if (!findTransaction) throw new Error("Transação não encontrada")
  
    return prismaClient.transaction.delete({
      where: {
        id,
      }
    })
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id
      }
    })

    if (!transaction) throw new Error("Transação não encontrada")

    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date
      }
    })
  }
}
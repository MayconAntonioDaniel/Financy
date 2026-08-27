import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"
import { prismaClient } from "../../prisma/prisma"
import { CategoryModel } from "../models/category.model"

export class TransactionService {
  async createTransaction(
    categoryId: string,
    authorId: string,
    data: CreateTransactionInput,
  ) {
    const findCategory = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!findCategory) throw new Error("Categoria não encontrada.")

    return prismaClient.transaction.create({
      data: {
        authorId,
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: categoryId,
      },
    })
  }

  async deleteTransaction(id: string) {
    const findTransaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!findTransaction) throw new Error("Transação não encontrada.")

    return prismaClient.transaction.delete({
      where: {
        id,
      },
    })
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const findTransaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!findTransaction) throw new Error("Transação não encontrada.")

    return prismaClient.transaction.update({
      where: {
        id,
      },
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
      },
    })
  }

  async ListByCategory(categoryId: string) {
    return prismaClient.transaction.findMany({
      where: {
        categoryId,
      },
    })
  }

  async listTransactions() {
    return prismaClient.transaction.findMany()
  }
}

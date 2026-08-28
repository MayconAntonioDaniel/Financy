import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input"
import { prismaClient } from "../../prisma/prisma"

export class TransactionService {
  async createTransaction(
    categoryId: string,
    authorId: string,
    data: CreateTransactionInput,
  ) {
    return prismaClient.$transaction(async (tx) => {
      const findCategory = await tx.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!findCategory) throw new Error("Categoria não encontrada.")

      const created = await tx.transaction.create({
        data: {
          authorId,
          type: data.type,
          description: data.description,
          date: data.date,
          amount: data.amount,
          categoryId: categoryId,
        },
      })

      await tx.category.update({
        where: { id: categoryId },
        data: {
          numberOfItems: {
            increment: 1,
          },
        },
      })

      return created
    })
  }

  async deleteTransaction(id: string) {
    return prismaClient.$transaction(async (tx) => {
      const findTransaction = await tx.transaction.findUnique({
        where: {
          id,
        },
      })

      if (!findTransaction) throw new Error("Transação não encontrada.")

      await tx.transaction.delete({
        where: {
          id,
        },
      })

      await tx.category.updateMany({
        where: { id: findTransaction.categoryId, numberOfItems: { gt: 0 } },
        data: {
          numberOfItems: {
            decrement: 1,
          },
        },
      })

      return true
    })
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    return prismaClient.$transaction(async (tx) => {
      const current = await tx.transaction.findUnique({
        where: {
          id,
        },
      })

      if (!current) throw new Error("Transação não encontrada.")

      if (data.categoryId && data.categoryId !== current.categoryId) {
        const nextCategory = await tx.category.findUnique({
          where: { id: data.categoryId },
        })
        if (!nextCategory) throw new Error("Categoria não encontrada.")
      }

      const updated = await tx.transaction.update({
        where: { id },
        data: {
          type: data.type,
          description: data.description,
          date: data.date,
          amount: data.amount,
          categoryId: data.categoryId,
        },
      })

      if (data.categoryId && data.categoryId !== current.categoryId) {
        await tx.category.updateMany({
          where: { id: current.categoryId, numberOfItems: { gt: 0 } },
          data: { numberOfItems: { decrement: 1 } },
        })
        await tx.category.update({
          where: { id: data.categoryId },
          data: { numberOfItems: { increment: 1 } },
        })
      }

      return updated
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

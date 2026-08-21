import { CreateTransactionInput } from "../dtos/input/transaction.input"
import { prismaClient } from "../../prisma/prisma";


export class TransactionService {
  async create(categoryId: string, authorId: string, data: CreateTransactionInput) {
    const findCategory = await prismaClient.category.findUnique({
      where: {
        id: categoryId
      }
    })
    
    if (!findCategory) throw new Error("Categoria não encontrada.")

    return prismaClient.transaction.create({
      data: {
        authorId,
        categoryId,
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount
      }
    })
  }
}
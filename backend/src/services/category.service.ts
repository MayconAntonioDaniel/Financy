import { prismaClient } from "../../prisma/prisma"
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input"

export class CategoryService {
  async createCategory(data: CreateCategoryInput, authorId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        numberOfItems: 0,
        authorId: authorId,
      },
    })
  }

  async listCategories() {
    return prismaClient.category.findMany()
  }

  async deleteCategory(id: string) {
    const findCategory = await prismaClient.category.findUnique({
      where: {
        id,
      },
    })
    if (!findCategory) throw new Error("Categoria não encontrada")

    const transactionsCount = await prismaClient.transaction.count({
      where: { categoryId: id },
    })

    if (transactionsCount > 0) {
      throw new Error(
        "Categoria em uso. Remova ou recategorize as transações antes de excluir.",
      )
    }

    return prismaClient.category.delete({
      where: {
        id,
      },
    })
  }

  async findCategoryId(id: string) {
    return prismaClient.category.findUnique({
      where: {
        id,
      },
    })
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) throw new Error("Categoria não encontrada")

    return prismaClient.category.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    })
  }
}

import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model.js";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input.js";
import { TransactionService } from "../services/transaction.service.js";
import { GqlUser } from "../graphql/decorator/user.decorator.js";
import { UserModel } from "../models/user.model.js";
import { CategoryService } from "../services/category.service.js";
import { CategoryModel } from "../models/category.model.js";
import { UserService } from "../services/user.service.js";
import { IsAuth } from "../middlewares/auth.middleware.js";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private categoryService = new CategoryService()
  private userService = new UserService()
  
  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg ('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(categoryId, user.id, data)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id)
    return true
  }

  @Query(() => [TransactionModel])
  async listTransactions(
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions()
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel | null> {
    return this.categoryService.findCategoryId(transaction.categoryId)
  }

  @FieldResolver(() => UserModel)
  async author(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.authorId)
  }
}
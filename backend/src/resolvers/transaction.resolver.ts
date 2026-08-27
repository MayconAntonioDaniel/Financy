import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { GqlUser } from "../graphql/decorator/user.decorator";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { CategoryModel } from "../models/category.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";

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
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)
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
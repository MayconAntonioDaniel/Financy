import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { GqlUser } from "../graphql/decorator/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private userService = new UserService()
  // constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel 
  ):Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string
  ):Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)
    return true
  }

  @Query(() => [TransactionModel])
  async listTransactions(): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions()
  }


  @FieldResolver(() => UserModel)
  async author(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.authorId)
  }
}

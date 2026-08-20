import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionInput } from "../dtos/input/transaction.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel 
  ):Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }
}

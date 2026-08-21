import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { CreateTransactionInput } from "../dtos/input/transaction.input";
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
    return this.transactionService.create(categoryId, user.id, data)
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
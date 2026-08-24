import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryService } from "../services/category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryModel } from "../models/category.model";
import { GqlUser } from "../graphql/decorator/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()
  private userService = new UserService()
  private transactionService = new TransactionService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel 
  ):Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string
  ):Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id)
    return true
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.listCategories()
  }

  @FieldResolver(() => UserModel)
  async author(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.authorId)
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    return this.transactionService.ListByCategory(category.id)
  }
}

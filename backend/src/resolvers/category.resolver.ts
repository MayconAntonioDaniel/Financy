import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryService } from "../services/category.service.js";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input.js";
import { CategoryModel } from "../models/category.model.js";
import { GqlUser } from "../graphql/decorator/user.decorator.js";
import { IsAuth } from "../middlewares/auth.middleware.js";
import { UserService } from "../services/user.service.js";
import { UserModel } from "../models/user.model.js";
import { TransactionModel } from "../models/transaction.model.js";
import { TransactionService } from "../services/transaction.service.js";

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
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel 
  ):Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel 
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id, user.id)
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

import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
} from "type-graphql"
import { UserService } from "../services/user.service.js"
import { IsAuth } from "../middlewares/auth.middleware.js"
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input.js"
import { UserModel } from "../models/user.model.js"
import { GraphqlContext } from "../graphql/context/index.js"
import { GqlUser } from "../graphql/decorator/user.decorator.js"

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService()

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput,
  ): Promise<UserModel> {
    return this.userService.createUser(data)
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data)
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
    if (ctx.user === id) throw new Error("Você não pode excluir a si mesmo.")
    return this.userService.deleteUser(id)
  }

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id)
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.listUsers()
  }

  @Query(() => UserModel)
  async getMe(@GqlUser() user: UserModel): Promise<UserModel> {
    if (!user) throw new Error("Usuário não autenticado.")
    return this.userService.findUser(user.id)
  }

  @Mutation(() => UserModel)
  async updateMe(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: UserModel,
  ): Promise<UserModel> {
    if (!user) throw new Error("Usuário não autenticado.")
    return this.userService.updateUser(user.id, data)
  }
}

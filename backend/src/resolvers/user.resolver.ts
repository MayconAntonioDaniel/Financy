import { Arg, Query, Resolver } from "type-graphql"
import { UserModel } from "../models/user.models"
import { UserService } from "../services/user.service"

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  // private userService = new UserService()

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id)
  }
}

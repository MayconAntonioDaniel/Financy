import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { UserModel } from "./user.model"
import { TransactionModel } from "./transaction.model"

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string

  @Field(() => Number)
  numberOfItems!: number

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => String)
  authorId!: string

  @Field(() => UserModel, { nullable: true })
  author?: UserModel

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]
}

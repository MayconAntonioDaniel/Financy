import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { UserModel } from "./user.model"

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  description!: string

  @Field(() => String)
  type!: string

  @Field(() => String)
  authorId!: string

  @Field(() => UserModel, { nullable: true })
  author?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

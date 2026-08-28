import { Field, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: string
  
  @Field(() => String)
  description!: string
  
  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Int)
  amount!: number

  @Field(() => String)
  categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  type?: string
  
  @Field(() => String, { nullable: true })
  description?: string
  
  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => Int, { nullable: true })
  amount?: number

  @Field(() => String, { nullable: true })
  categoryId?: string
}
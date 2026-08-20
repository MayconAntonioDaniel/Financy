import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: string
  
  @Field(() => String)
  description!: string

  @Field(() => String)
  createdAt!: string
  
  @Field(() => Number)
  amount!: number
 
  @Field(() => String)
  category!: string
}
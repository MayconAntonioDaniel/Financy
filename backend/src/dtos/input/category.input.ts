import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
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
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true } )
  description?: string | null

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string

  @Field(() => Number)
  numberOfItems!: number
}
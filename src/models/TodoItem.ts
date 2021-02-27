import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType()
export class TodoItem {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  description: string;

  @Field({defaultValue: false})
  completed: boolean;

  @Field({nullable: true})
  dynamicValue?: String
}

@InputType()
export class TodoItemInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  description: string;

  @Field({defaultValue: false})
  completed: boolean;

}
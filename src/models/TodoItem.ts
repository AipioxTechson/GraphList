import { ObjectType, Field, ID } from 'type-graphql';

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
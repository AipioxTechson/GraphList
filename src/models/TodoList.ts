import { ObjectType, Field, ID, Root } from 'type-graphql';
import { TodoItem } from './TodoItem';

@ObjectType()
export class TodoList {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  description: string;

  @Field()
  dateCreated: Date;

  @Field(type => [TodoItem])
  TodoItems: TodoItem[];

  @Field({nullable:true})
  dynamicValue(@Root() root: any): String {
    console.log(root);
    return "bye";
  }

}
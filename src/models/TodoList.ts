import { ObjectType, Field, ID, Root, InputType } from 'type-graphql';
import { TodoItem, TodoItemInput } from './TodoItem';

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

@InputType()
export class TodoListInput {
  @Field(type => ID, {nullable: true})
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  description: string;

  @Field({nullable: true})
  dateCreated?: Date;

  @Field(type => [TodoItemInput], {nullable: true})
  TodoItems?: TodoItemInput[];

} 

@ObjectType()
export class SuccessMessage {
  @Field(type => ID)
  status: string;

  @Field(type => TodoList, {nullable: true})
  data?: TodoList;
}
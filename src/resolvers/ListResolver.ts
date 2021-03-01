import { Resolver, Query, Arg, FieldResolver, Root, Ctx, Info, Mutation } from "type-graphql";
import { TodoList, TodoItem, TodoListInput, TodoItemInput, SuccessMessage } from '../models';

const TodoItem1: TodoItem = {
  id: "11",
  completed: false,
  description: "TODO ITEM"
}

const TodoItem2: TodoItem = {
  id: "10",
  completed: false,
  description: "TODO ITEM"
}

const TodoLists: Array<TodoList> = [{
  id: "10",
  description: "Hi there",
  title: "First TODO",
  dateCreated: new Date(),
  TodoItems: [TodoItem1],
}] as Array<TodoList>

const TodoItems = [TodoItem1, TodoItem2];

@Resolver(of => TodoList)
export class TodoResolver {
  @Query(() => [TodoList])
  TodoLists() {
    return TodoLists;
  }
  @Query(() => [TodoList])
  TodoListsWithID(
    @Root() Query: any,
    @Arg("id", { nullable: true }) id?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("title", { nullable: true }) title?: string,
  ): TodoList[] {
    console.log(Query);
    return TodoLists.filter(todoList => (id && todoList.id === id) || (description && todoList.description === description) || (title && todoList.title === title))
  }

  @Mutation()
  createTodoList(@Arg("data") {TodoItems: newTodoItems, ...rest}: TodoListInput): SuccessMessage {
    const newItem = {TodoItems: newTodoItems, ...rest} as TodoList;
    const todoItems = newTodoItems as TodoItem[]
    Array.prototype.push.apply(TodoItems, todoItems);
    TodoLists.push(newItem);
    return {
      status: "OK",
      data: newItem
    };
  }
  @Mutation()
  updateTodoList(@Arg("id") id: String, @Arg("data") {title, description, dateCreated}: TodoListInput ): SuccessMessage {
    const todoList = TodoLists.find(todo => todo.id === id);
    if (todoList) {
      todoList.title = title?? todoList.title
      todoList.description = description?? todoList.description
      todoList.dateCreated = dateCreated?? todoList.dateCreated
      return {
        status: "OK",
        data: todoList
      }
    }
    return {
      status: "NOT_FOUND"
    }

  };

/**  @FieldResolver()
  TodoItems(@Root() todoList: TodoList){
    console.log(todoList);
    return todoList.TodoItems.concat([TodoItem2]);
  }
  */

}

@Resolver(of => TodoItem)
export class TodoItemResolver { 

  @Query(() => [TodoItem])
  TodoItems(): TodoItem[] {
    return TodoItems;
  }

  @Mutation()
  createTodoItem(@Arg("data") newData: TodoItemInput): TodoItem {
    return TodoItem2;
  };

  @FieldResolver()
  dynamicValue(@Root() todoItem: TodoItem, @Ctx() context: any, @Info() info: any) { 
    return todoItem.id + 1;
   }
}

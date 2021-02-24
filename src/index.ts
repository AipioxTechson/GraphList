import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import { TodoResolver, TodoItemResolver } from "./resolvers/ListResolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [TodoItemResolver,TodoResolver]
  })
  const server = new ApolloServer({ cors: true, schema, playground: {    endpoint: "/dev/graphql"  }})
  await server.listen(process.env.PORT || 4000)
  console.log("Server has started!")
}

main();
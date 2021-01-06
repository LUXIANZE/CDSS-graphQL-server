import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { APP_PORT, IN_PROD, CONNECTION_STRING } from "./config";
import mongoose from "mongoose";

const app = express();

app.disable("x-powered-by");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD,
  // mocks: true
});

server.applyMiddleware({ app });

const port = process.env.PORT || APP_PORT;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    return app.listen({ port: port });
  })
  .then((res) => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });

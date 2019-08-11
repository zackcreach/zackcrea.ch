const express = require("express");
const path = require("path");
const cors = require("cors");
const merge = require("lodash/merge");
const { ApolloServer } = require("apollo-server-express");

const router = require("./router");
const loadTypes = require("./backend/utilities/loadTypes");
const transaction = require("./backend/types/transaction/transaction.resolvers");

const PORT = process.env.PORT || 1337;
const HOST = process.env.HOST || "localhost";

const app = express();

(async () => {
  const tables = ["transaction"];
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;
  const types = await Promise.all(tables.map(loadTypes));
  const typeDefs = [rootSchema, ...types];
  const resolvers = merge({}, transaction);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  server.applyMiddleware({ app });
  console.log(`Graphiql:   ${HOST}:${PORT}${server.graphqlPath}\n\n`);
})();

app.set("views", path.resolve(__dirname, "./frontend/views"));
app.set("view engine", "pug");

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`\nRoot:       ${HOST}:${PORT}`);
});

const express = require("express");
const path = require("path");
const cors = require("cors");
const { merge } = require("lodash");
const { ApolloServer } = require("apollo-server-express");

const loadTypes = require("./backend/utilities/loadTypes");
const transaction = require("./backend/types/transaction/transaction.resolvers");

const PORT = process.env.PORT || 1337;
const HOST = process.env.HOST || "localhost";

const app = express();

const graphql = (async () => {
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

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
  console.log(`Graphiql:   http://0.0.0.0:${PORT}${server.graphqlPath}`);
})();

app.set("views", path.resolve(__dirname, "./frontend/views"));
app.set("view engine", "pug");

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/balance", (req, res) => {
  res.render("balance", { title: "Balance" });
});

app.listen(PORT, () => {
  console.log(`\nRoot:       http://0.0.0.0:${PORT}`);
});

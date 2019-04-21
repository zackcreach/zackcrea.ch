const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const database = require("./database");

const PORT = process.env.PORT || 1337;
const HOST = process.env.HOST || "localhost";

const typeDefs = gql`
  type Transaction {
    id: Int!
    uuid: String!
    source: String!
    title: String!
    user: String
    category: String
    reoccuring: Boolean
    budget: Float
    cost: Float!
  }
  type Query {
    transactions: [Transaction]
  }
  type Mutation {
    addTransaction(
      source: String!
      title: String!
      user: String!
      category: String
      reoccuring: Boolean
      budget: Float
      cost: Float!
    ): Int
  }
`;

const resolvers = {
  Query: {
    transactions: async () => {
      const transactions = await database("transactions").select();
      return transactions;
    }
  },
  Mutation: {
    addTransaction: async (
      _,
      { source, title, user, category, reoccuring, budget, cost }
    ) => {
      const [id] = await database("transactions")
        .returning("id")
        .insert({
          source,
          title,
          user,
          category,
          reoccuring,
          budget,
          cost
        });
      return id;
    }
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.set("views", path.resolve(__dirname, "./src/views"));
app.set("view engine", "pug");

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/balance", (req, res) => {
  res.render("balance");
});

app.listen(PORT, () => {
  console.log(
    `\nRoot:       http://0.0.0.0:${PORT}\nGraphiql:   http://0.0.0.0:${PORT}${
      server.graphqlPath
    }`
  );
});

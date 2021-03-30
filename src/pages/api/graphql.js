import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import db from "../../../lib/database";

const apolloServer = new ApolloServer({
  db,
  schema,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

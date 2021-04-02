import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import { db } from "../../../lib/database";

db.connect();

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return { ...ctx, db };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

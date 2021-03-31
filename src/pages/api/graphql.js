import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../../apollo/schema";
import { client } from "../../../lib/database";

client.connect();

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return { ...ctx, client };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

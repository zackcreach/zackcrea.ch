import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { createUser, findUser, validatePassword } from "../lib/user";
import { setLoginSession, getLoginSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies.js";

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email }, context.db);
        }
      } catch (error) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }
    },
    async gifs(_parent, _args, context, _info) {
      try {
        const result = await getGifList(context.db);

        return { result };
      } catch (error) {
        throw new Error(
          `Error: gifs could not be retrieved. Details: ${error}`
        );
      }
    },
    async gif(_parent, args, context, _info) {
      try {
        const result = await getGif(args.id, context.db);

        return { result };
      } catch (error) {
        throw new Error(`Error: gif could not be retrieved. Details: ${error}`);
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const user = await createUser(args.input, context.db);
      return { user };
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email }, context.db);

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        };

        await setLoginSession(context.res, session);

        return { user };
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },
    async addGif(_parent, args, context, _info) {
      const result = await createGif(args.id, context.db);
      return { result };
    },
  },
};

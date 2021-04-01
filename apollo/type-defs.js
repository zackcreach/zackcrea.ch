import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    created_ts: String!
    hash: String!
    salt: String!
  }
  type Gif {
    id: ID!
    name: String!
    url: String!
    tags: [String]!
    created_ts: String!
    updated_ts: String!
  }
  type Tag {
    id: ID!
    name: String!
    created_ts: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }
  type AddGifPayload {
    gif: Gif!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    gifs: [Gif]
    gif(id: ID!): Gif!
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    addGif(id: ID!): AddGifPayload!
  }
`;

const { gql } = require("graphql-tag");

const schemaDefs = gql`
  type Book {
    title: String
    author: String
    userId: String
  }
  type LibUsers {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
    password: String!
    address: String
  }

  type Query {
    #-----------books -------------
    books: [Book]

    #-----------users -------------
    user(id: ID!): LibUsers!
    users: [LibUsers!]!
    userBooks(userId: ID!): [Book]
    deleteUser: User
  }

  type Mutation {
    createUser(
      name: String!
      age: Int!
      email: String!
      password: String!
      address: String
    ): User
    createUsers(users: [UserInput!]!): [User!]!
    updateUser(
      id: ID!
      name: String!
      age: Int!
      email: String!
      password: String!
      address: String
    ): User
    deleteUser(id: ID!): User
  }
  input UserInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    address: String
  }
`;

module.exports = schemaDefs;

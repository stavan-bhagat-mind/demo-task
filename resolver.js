// const { User } = require('./models');
const { LibUsers, books } = require("./db");
const Models = require("./models/index");
console.log(Models);
const resolvers = {
  Query: {
    //books
    books: (parent, args, context, info) => {
      return books;
    },
    userBooks: (parent, { userId }) => {
      return books.filter((book) => book.userId == userId);
    },
    //users
    user: (parent, { id }, context, info) => {
      return LibUsers.find((user) => user.id == id);
    },
    users: (parent, args, context, info) => {
      return LibUsers;
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { id, name, email, age, password, address },
      context,
      info
    ) => {
      const newUser = { name, email, age, email, password, address };
      const result = await Models.User.create(newUser);
      console.log("result", result);
      return result;
    },
  },
};

module.exports = resolvers;

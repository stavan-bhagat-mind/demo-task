// const { User } = require('./models');
const { where } = require("sequelize");
const { LibUsers, books } = require("./db");
const Models = require("./models/index");
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
      { name, email, age, password, address },
      context,
      info
    ) => {
      const newUser = { name, email, age, email, password, address };
      const result = await Models.User.create(newUser);
      console.log("result", result);
      return result;
    },
    createUsers: async (parent, users, context, info) => {
      const result = await Models.User.bulkCreate(users);
      console.log("result", result);
      return result;
    },
    updateUser: (
      parent,
      { id, name, email, age, password, address },
      context,
      info
    ) => {
      // newUser.name = name;
      // newUser.email = email;
      // newUser.age = age;
      // return newUser;
    },
    deleteUser: async (parent, { id }, context, info) => {
      console.log(id);
      // const userIndex = users.findIndex((user) => user.id === id);
      const result = await Models.User.destroy({ where: { id: id } });

      console.log(result);

      return result;
    },
  },
};

module.exports = resolvers;

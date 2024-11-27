"use strict";
const { Model } = require("sequelize");
const { Models } = require("../models/index");
const fs = require("fs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      hooks: {
        beforeValidate: (user, options) => {
          user.name = user.name.trim();
        },
      },
    }
  );
  //static method declaration - hooks
  User.afterValidate("myHookIndividualBeforeName", (user, options) => {
    user.name = `Ind. ${user.name}`;
  });
  // global declaration methods
  sequelize.addHook("validationFailed", (instance, options, error) => {
    console.error("Validation failed:", error.errors);

    error.errors.forEach((err) => {
      if (err.path === "name" && err.type === "notEmpty") {
        err.message = "Please provide a valid name";
      }
    });

    throw error;
  });
  // Add connection hooks (ChatGpt)
  // sequelize.addHook("beforeConnect", async (config) => {
  //   console.log("Before connecting to the database:", config);

  //   fs.appendFileSync(
  //     "connection.log",
  //     `Before connecting to the database: ${JSON.stringify(config)}\n`
  //   );
  // });

  // sequelize.addHook("afterConnect", async (connection, config) => {
  //   console.log("Connected to the database:", config);

  //   fs.appendFileSync(
  //     "connection.log",
  //     `Connected to the database: ${JSON.stringify(config)}\n`
  //   );

  //   connection.pool = {
  //     max: 10,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000,
  //   };
  // });

  // sequelize.addHook("beforeDisconnect", async (connection) => {
  //   console.log("Before disconnecting from the database:", connection);

  //   fs.appendFileSync(
  //     "connection.log",
  //     `Before disconnecting from the database: ${JSON.stringify(connection)}\n`
  //   );

  //   if (connection.pool) {
  //     await connection.pool.end();
  //   }
  // });

  // sequelize.addHook("afterDisconnect", async (connection) => {
  //   console.log("Disconnected from the database:", connection);

  //   fs.appendFileSync(
  //     "connection.log",
  //     `Disconnected from the database: ${JSON.stringify(connection)}\n`
  //   );

  //   if (connection.pool) {
  //     connection.pool = null;
  //   }
  // });
  return User;
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null
      unique: true,
    });
    await queryInterface.addColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null
    });
    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Update existing rows to set unique values for email and a default value for password
    await queryInterface.sequelize.query(`
      UPDATE "users"
      SET "email" = 'default' || id || '@example.com', "password" = 'test@123'
      WHERE "email" IS NULL OR "password" IS NULL
    `);

    // Change the constraints using raw SQL queries
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "email" SET NOT NULL,
      ALTER COLUMN "password" SET NOT NULL
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "password");
    await queryInterface.removeColumn("users", "address");
  },
};

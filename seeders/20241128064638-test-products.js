"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          name: "4K Ultra HD TV",
          price: 800.0,
          details: JSON.stringify({
            description:
              "A stunning 4K Ultra HD TV with vibrant colors and deep blacks.",
            features: ["4K Resolution", "Smart TV", "HDR Support"],
          }),
          created_by: 1,
          updated_by: null,
          created_at: new Date("2024-11-25 10:00:00"),
          updated_at: new Date("2024-11-25 10:00:00"),
          deleted_at: null,
        },
        {
          id: 2,
          name: "Bluetooth Speaker",
          price: 150.0,
          details: JSON.stringify({
            description: "Portable Bluetooth speaker with rich sound quality.",
            features: [
              "Water Resistant",
              "10-hour battery life",
              "Built-in microphone",
            ],
          }),
          created_by: 2,
          updated_by: null,
          created_at: new Date("2024-11-25 11:00:00"),
          updated_at: new Date("2024-11-25 11:00:00"),
          deleted_at: null,
        },
        {
          id: 3,
          name: "Gaming Laptop",
          price: 1500.0,
          details: JSON.stringify({
            description:
              "High-performance gaming laptop with advanced cooling.",
            features: ["NVIDIA GeForce RTX 3060", "32GB RAM", "1TB SSD"],
          }),
          created_by: 1,
          updated_by: null,
          created_at: new Date("2024-11-25 12:00:00"),
          updated_at: new Date("2024-11-25 12:00:00"),
          deleted_at: null,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */

    await queryInterface.bulkDelete("products", null, {});
  },
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // For example, if you have a User model and a Product model:
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Product, { foreignKey: "productId" });
    }

    // Class method to find orders by user ID
    static async findByUserId(userId) {
      return this.findAll({ where: { userId } });
    }

    // Instance method to calculate the total price for an order
    calculateTotalPrice(quantity, pricePerUnit) {
      return quantity * pricePerUnit;
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};

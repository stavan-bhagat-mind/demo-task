"use strict";
const { Model } = require("sequelize");
const { options } = require("../Routers/UserRouter");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Review, {
        foreignKey: "reviewable_id",
        as: "product_review",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      details: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Product",
      tableName: "products",
      hooks: {
        beforeCreate: (product, options) => {
          if (!product.price) {
            product.price = 10;
          }
        },
        afterCreate: (product, options) => {
          console.log(product.toJSON());
          // can be used to send mail new product created/launched
        },
        beforeBulkCreate: (product, options) => {
          product.forEach((instance) => {
            if (!instance.price) {
              instance.price = 10;
            }
          });
        },
        afterBulkCreate: (product, options) => {
          product.forEach((instance) => {
            console.log(instance.toJSON());
          });
        },
        beforeBulkDestroy: (options) => {
          console.log("Before bulk destroy:", options);
        },
        afterBulkDestroy: (options) => {
          console.log("After bulk destroy:", options);
        },
        beforeBulkUpdate: (options) => {
          console.log("Before bulk update:", options);
        },
        afterBulkUpdate: (options) => {
          console.log("After bulk update:", options);
        },
      },
    }
  );
  sequelize.addHook("beforeDefine", (attributes, options) => {
    // attributes.price.defaultValue = 15;
  });~

  sequelize.addHook("afterDefine", (factory) => {
    console.log("Product model defined:", factory);
  });

  sequelize.addHook("beforeInit", (options) => {
    options.underscored = true;
  });

  sequelize.addHook("afterInit", (model, options) => {
    console.log("Product model initialized:", model);
  });

  sequelize.addHook("beforeBulkSync", (options) => {
    options.force = true;
  });

  sequelize.addHook("afterBulkSync", (options) => {
    console.log("Bulk synchronization completed:", options);
  });

  return Product;
};

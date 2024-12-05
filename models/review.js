"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Product, {
        foreignKey: "reviewable_id",
        as: "product_review",
      });
      Review.belongsTo(models.Service, {
        foreignKey: "reviewable_id",
        as: "service_review",
      });
    }
  }
  Review.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewable_type: {
        type: DataTypes.ENUM("product", "service"),
        allowNull: false,
      },
      reviewable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      underscored: true,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Review",
      tableName: "reviews",
      hooks: {
        beforeDestroy: (review, options) => {
          if (review.rating === 5) {
            throw new Error("Cannot delete");
          }
        },
        afterDestroy: (review, options) => {
          console.log("After Destroy:", user.toJSON());
          //can be implemented logout
        },
        beforeFind: (options) => {
          if (!options.where) {
            options.where = {};
          }
          options.where.deleted_at = null;
        },
        beforeFindAfterOptions: (options) => {
          options.limit = options.limit || 50;
          options.order = options.order || [["created_at", "DESC"]];
        },
      },
    }
  );
  return Review;
};

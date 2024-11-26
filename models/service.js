"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.hasMany(models.Review, {
        foreignKey: "reviewable_id",
        as: "service_review",
      });
    }
  }
  Service.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      description: {
        type: DataTypes.STRING,
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
      modelName: "Service",
      tableName: "services",
      hooks: {
        beforeUpdate: (service, options) => {
          console.log("Before Update:", service.toJSON());
          if (service.description) {
            service.description = service.description.trim();
          }
        },
        afterUpdate: (service, options) => {
          console.log("after Update:", service.toJSON());
        },
        beforeSave: (service, options) => {
          console.log("Before Save:", service.toJSON());

          if (!service.name) {
            service.name = service.name.trim().toLowerCase();
          }
        },
        afterSave: (service, options) => {
          console.log("After Save:", service.toJSON());
        },
      },
    }
  );
  return Service;
};

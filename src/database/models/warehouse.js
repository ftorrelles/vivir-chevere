'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.belongsTo(models.Branch, {
        foreignKey: 'branch_id',
      });
      Warehouse.hasMany(models.Product, {
        foreignKey: 'products_id',
      });
    }
  }
  Warehouse.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'products',
          field: 'id',
        },
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'branches',
          field: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: true,
    }
  );
  return Warehouse;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement_item extends Model {
    static associate(models) {
      Movement_item.belongsTo(models.Movement, {
        foreignKey: 'movement_id',
      });
      Movement_item.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
    }
  }
  Movement_item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      movement_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'movements',
          field: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'products',
          field: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_line: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movement_item',
      timestamps: true,
    }
  );
  return Movement_item;
};

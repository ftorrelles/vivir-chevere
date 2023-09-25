'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warehouse_item.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId',
      });
      Warehouse_item.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
    }
  }
  Warehouse_item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      warehouseId: {
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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Warehouse_item',
    }
  );
  return Warehouse_item;
};

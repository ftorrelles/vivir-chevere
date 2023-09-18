'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warehouse.belongsTo(models.Branch, {
        foreignKey: 'branchId',
      });
      Warehouse.hasMany(models.Wharehouse_item, {
        foreignKey: 'warehouseId',
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
      branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Warehouse',
    }
  );
  return Warehouse;
};

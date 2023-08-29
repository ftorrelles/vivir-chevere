'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.hasMany(models.Warehouse, {
        foreignKey: 'branchId',
      });
      Branch.hasMany(models.Movement, {
        foreignKey: 'branchId',
      });
      Branch.belongsTo(models.Customer, {
        foreignKey: 'customerId',
      });
    }
  }
  Branch.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Branch',
    }
  );
  return Branch;
};

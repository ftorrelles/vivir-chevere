'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      Branch.hasMany(models.Warehouse, {
        foreignKey: 'branch_id',
      });
      Branch.hasMany(models.Movement, {
        foreignKey: 'branch_id',
      });
      Branch.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
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
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: 'customers',
          field: 'id',
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Branch',
      timestamps: true,
    }
  );
  return Branch;
};

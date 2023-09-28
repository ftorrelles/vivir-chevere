'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    static associate(models) {
      Movement.belongsTo(models.Type_movement, {
        foreignKey: 'typemovement_id',
      });
      Movement.hasMany(models.Movement_item, {
        foreignKey: 'movement_id',
      });
      Movement.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
      });
      Movement.belongsTo(models.Branch, {
        foreignKey: 'branch_id',
      });
      Movement.belongsTo(models.Customer, {
        foreignKey: 'dispatcher_id',
      });
    }
  }
  Movement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      movement_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      typemovement_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'type_movements',
          field: 'id',
        },
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'customers',
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
      dispatcher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'customers',
          field: 'id',
        },
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
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
      modelName: 'Movement',
      timestamps: true,
    }
  );
  return Movement;
};

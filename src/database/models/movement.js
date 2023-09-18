'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movement.belongsTo(models.Type_movement, {
        foreignKey: 'typemovementId',
      });
      Movement.hasMany(models.Movement_item, {
        foreignKey: 'movementId',
      });
      Movement.belongsTo(models.Customer, {
        foreignKey: 'customerId',
      });
      Movement.belongsTo(models.Branch, {
        foreignKey: 'branchId',
      });
      Movement.belongsTo(models.Customer, {
        foreignKey: 'dispatcherId',
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
      typemovementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dispatcherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movement',
    }
  );
  return Movement;
};

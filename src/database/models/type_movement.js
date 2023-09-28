'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_movement extends Model {
    static associate(models) {
      Type_movement.hasMany(models.Movement, {
        foreignKey: 'typemovement_id',
      });
      Type_movement.hasMany(models.Cuenta_cliente, {
        foreignKey: 'typemovement_id',
      });
    }
  }
  Type_movement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Type_movement',
      timestamps: true,
    }
  );
  return Type_movement;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type_movement.hasMany(models.Movement, {
        foreignKey: 'typemovementId',
      });
      Type_movement.hasMany(models.cuenta_cliente, {
        foreignKey: 'typemovementid',
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
    }
  );
  return Type_movement;
};

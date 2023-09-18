'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuenta_cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cuenta_cliente.belongsTo(models.Type_movement, {
        foreignKey: 'typemovementid',
      });
      cuenta_cliente.belongsTo(models.Customer, {
        foreignKey: 'Customerid',
      });
    }
  }
  cuenta_cliente.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      typemovementid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customerid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ingreso: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      egreso: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'cuenta_cliente',
    }
  );
  return cuenta_cliente;
};

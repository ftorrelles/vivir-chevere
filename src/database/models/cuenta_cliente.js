'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuenta_cliente extends Model {
    static associate(models) {
      Cuenta_cliente.belongsTo(models.Type_movement, {
        foreignKey: 'typemovement_id',
      });
      Cuenta_cliente.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
      });
    }
  }
  Cuenta_cliente.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      typemovement_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          table: 'type_movements',
          field: 'id',
        },
      },
      customer_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          table: 'customers',
          field: 'id',
        },
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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cuenta_cliente',
      timestamps: true,
    }
  );
  return Cuenta_cliente;
};

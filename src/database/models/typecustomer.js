'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TypeCustomer extends Model {
    // En el modelo TypeCustomer
    static associate(models) {
      TypeCustomer.hasMany(models.Customer, {
        foreignKey: 'type_customer_id',
        as: 'customers',
      });
    }
  }

  TypeCustomer.init(
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
    },
    {
      sequelize,
      modelName: 'TypeCustomer',
      tableName: 'type_customers', // Cambio en el nombre de la tabla
      // underscored: true, // Usa nombres de columna en notación snake_case
      timestamps: true, // Habilita la opción de timestamps
    }
  );

  return TypeCustomer;
};

'use strict';
const Sequelize = require('sequelize');

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
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    },
    {
      sequelize,
      modelName: 'TypeCustomer',
      tableName: 'type_customers', // Cambio en el nombre de la tabla
      underscored: true, // Usa nombres de columna en notación snake_case
      timestamps: true, // Habilita la opción de timestamps
    }
  );

  return TypeCustomer;
};

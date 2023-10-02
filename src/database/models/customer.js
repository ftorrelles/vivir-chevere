'use strict';
const Sequelize = require('sequelize');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    // En el modelo Customer
    static associate(models) {
      Customer.belongsTo(models.TypeCustomer, {
        foreignKey: 'type_customer_id',
      });
      Customer.belongsTo(models.Role, {
        foreignKey: 'role_id',
      });
      Customer.hasMany(models.Movement, {
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.Movement, {
        foreignKey: 'dispatcher_id',
      });
      Customer.hasMany(models.Cuenta_cliente, {
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.EmailCode, {
        foreignKey: 'customer_id',
      });
    }
  }

  Customer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identification_document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
      },
      type_customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'type_customers',
          key: 'id',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      ref: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      modelName: 'Customer',
      tableName: 'customers',
      underscored: true,
      timestamps: true,
    }
  );

  return Customer;
};

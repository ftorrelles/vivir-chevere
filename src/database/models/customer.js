'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here

      Customer.belongsTo(models.TypeCustomer, {
        foreignKey: 'typecustomerId',
        as: 'typeCustomer',
      });
      Customer.hasMany(models.Movement, {
        foreignKey: 'customerId',
      });
      Customer.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
      Customer.hasMany(models.Branch, {
        foreignKey: 'customerId',
      });
      Customer.hasMany(models.EmailCode, {
        foreignKey: 'customerId',
      });
      Customer.hasMany(models.Movement, {
        foreignKey: 'dispatcherId',
      });
      Customer.hasMany(models.cuenta_cliente, {
        foreignKey: 'customerid',
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identificationDocument: {
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
      typecustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ref: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );

  return Customer;
};

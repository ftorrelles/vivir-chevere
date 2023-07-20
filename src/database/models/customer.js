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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      typecustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // password: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );

  return Customer;
};

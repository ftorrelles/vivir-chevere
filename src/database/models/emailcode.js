'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailCode extends Model {
    static associate(models) {
      EmailCode.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
      });
    }
  }
  EmailCode.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.TEXT,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          table: 'Customers',
          field: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    },
    {
      sequelize,
      modelName: 'EmailCode',
      underscored: true,
      timestamps: true,
    }
  );
  return EmailCode;
};

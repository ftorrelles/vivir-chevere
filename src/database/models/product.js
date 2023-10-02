'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Specification, {
        foreignKey: 'specification_id',
      });
      Product.hasMany(models.Movement_item, {
        foreignKey: 'product_id',
      });
      Product.hasMany(models.Warehouse, {
        foreignKey: 'product_id',
      });
    }
  }
  Product.init(
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
      measure: {
        type: DataTypes.INTEGER,
      },
      specification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'specifications',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      price_afiliate: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0,
        allowNull: false,
      },
      price_general: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
      modelName: 'Product',
      underscored: true, // Usa nombres de columna en notación snake_case
      timestamps: true, // Habilita la opción de timestamps
    }
  );
  return Product;
};

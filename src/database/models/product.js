'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Specification, {
        foreignKey: 'specificationId',
      });
      Product.hasMany(models.Movement_item, {
        foreignKey: 'productId',
      });
      Product.hasMany(models.Wharehouse_item, {
        foreignKey: 'productId',
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
      specificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_afiliate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      price_general: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};

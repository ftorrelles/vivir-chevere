'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      TypeCustomer.hasMany(models.Customer, {
        foreignKey: 'role_id',
        as: 'customers',
      });
    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name_role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: true,
    }
  );
  return Role;
};

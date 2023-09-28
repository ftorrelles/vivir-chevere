'use strict';

const { promises } = require('nodemailer/lib/xoauth2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      await queryInterface.createTable('Customers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        identification_document: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birthdate: {
          type: Sequelize.DATEONLY,
        },
        type_customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        ref: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        is_verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: Sequelize.BOOLEAN,
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
      }),
      queryInterface.addConstraint('Customers', {
        fields: ['type_customer_id'],
        type: 'foreign key',
        name: 'fk_customers_type_customers',
        references: {
          table: 'type_customers',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Customers', {
        fields: ['role_id'],
        type: 'foreign key',
        name: 'fk_customers_role',
        references: {
          table: 'roles',
          field: 'id',
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.dropTable('Customers')]);
  },
};

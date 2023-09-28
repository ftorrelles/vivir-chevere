'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.createTable('Warehouses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        branch_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      queryInterface.addConstraint('Warehouses', {
        fields: ['product_id'],
        type: 'foreign key',
        name: 'fk_warehouses_product',
        references: {
          table: 'products',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Warehouses', {
        fields: ['branch_id'],
        type: 'foreign key',
        name: 'fk_warehouses_branch',
        references: {
          table: 'branches',
          field: 'id',
        },
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Warehouses');
  },
};

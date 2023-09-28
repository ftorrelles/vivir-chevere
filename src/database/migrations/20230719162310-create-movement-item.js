'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.createTable('Movement_items', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        movement_id: {
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
        total_line: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
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
      queryInterface.addConstraint('Movement_items', {
        fields: ['movement_id'],
        type: 'foreign key',
        name: 'fk_Movement_items_movements',
        references: {
          table: 'movements',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Movement_items', {
        fields: ['product_id'],
        type: 'foreign key',
        name: 'fk_Movement_items_products',
        references: {
          table: 'products',
          field: 'id',
        },
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movement_items');
  },
};

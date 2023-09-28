'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.createTable('Movements', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        movement_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
        },
        typemovement_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        customer_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        branch_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        dispatcher_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        total: {
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
      queryInterface.addConstraint('Movements', {
        fields: ['typemovement_id'],
        type: 'foreign key',
        name: 'fk_movements_type_movements',
        references: {
          table: 'type_movements',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Movements', {
        fields: ['customer_id'],
        type: 'foreign key',
        name: 'fk_movements_customers',
        references: {
          table: 'customers',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Movements', {
        fields: ['branch_id'],
        type: 'foreign key',
        name: 'fk_movements_branches',
        references: {
          table: 'branches',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Movements', {
        fields: ['dispatcher_id'],
        type: 'foreign key',
        name: 'fk_movements_customer_dispatcher',
        references: {
          table: 'customers',
          field: 'id',
        },
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movements');
  },
};

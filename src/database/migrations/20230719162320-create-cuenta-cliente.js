'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.createTable('Cuenta_clientes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        typemovement_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        customer_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        ingreso: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
        },
        egreso: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
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
      queryInterface.addConstraint('Cuenta_clientes', {
        fields: ['typemovement_id'],
        type: 'foreign key',
        name: 'fk_cuenta_cliente_type_movements',
        references: {
          table: 'type_movements',
          field: 'id',
        },
      }),
      queryInterface.addConstraint('Cuenta_clientes', {
        fields: ['customer_id'],
        type: 'foreign key',
        name: 'fk_cuenta_cliente_customers',
        references: {
          table: 'customers',
          field: 'id',
        },
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cuenta_clientes');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.addColumn('cuenta_clientes', 'movement_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('cuenta_clientes', {
        fields: ['movement_id'],
        type: 'foreign key',
        name: 'fk_cuenta_cliente_movements',
        references: {
          table: 'movements',
          field: 'id',
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cuenta_clientes', 'movement_id');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cuenta_clientes', 'verified_payment', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cuenta_clientes', 'verified_payment');
  },
};

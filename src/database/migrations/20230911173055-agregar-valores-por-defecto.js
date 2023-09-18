'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cuenta_clientes', 'ingreso', {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    });
    await queryInterface.changeColumn('cuenta_clientes', 'egreso', {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cuenta_clientes', 'ingreso', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
    await queryInterface.changeColumn('cuenta_clientes', 'egreso', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },
};

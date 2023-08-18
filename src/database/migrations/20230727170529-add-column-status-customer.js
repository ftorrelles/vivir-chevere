'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Customers', 'status', {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Customers', 'status');
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

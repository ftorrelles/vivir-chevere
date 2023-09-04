'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn;
    'Customers', 'typeCustomerId', 'typecustomerId'; ///asi es el original, lo cambie por conflictos para ejecutar nuevas migraciones
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Customers',
      'typecustomerId',
      'typeCustomerId'
    );
  },
};

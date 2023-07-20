'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Customers',
      'typeCustomerId',
      'typecustomerId'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Customers',
      'typecustomerId',
      'typeCustomerId'
    );
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Customers', 'password');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Customers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

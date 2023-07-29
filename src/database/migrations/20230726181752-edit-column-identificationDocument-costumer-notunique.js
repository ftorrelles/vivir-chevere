'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'identificationDocument', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'identificationDocument', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
  },
};

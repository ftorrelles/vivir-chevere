'use strict';

const { promises } = require('nodemailer/lib/xoauth2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('Customers', 'phone', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('Customers', 'birthdate', {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('Customers', 'phone', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn('Customers', 'birthdate', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },
};

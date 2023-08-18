'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await Promise.all([
    //   queryInterface.addColumn('Customers', 'ref', {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //   }),
    //   queryInterface.addColumn('Customers', 'isVerified', {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false,
    //   }),
    //   queryInterface.addColumn('Customers', 'username', {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   }),
    //   queryInterface.addColumn('Customers', 'password', {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   }),
    // ]);
  },

  async down(queryInterface, Sequelize) {
    // await Promise.all([
    //   queryInterface.removeColumn('Customers', 'ref'),
    //   queryInterface.removeColumn('Customers', 'isVerified'),
    //   queryInterface.removeColumn('Customers', 'username'),
    //   queryInterface.removeColumn('Customers', 'password'),
    // ]);
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

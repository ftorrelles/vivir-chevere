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
    // ]);
  },

  async down(queryInterface, Sequelize) {
    // queryInterface.removeColumn('Customers', 'password');
    // await Promise.all([
    //   queryInterface.removeColumn('Customers', 'ref'),
    //   queryInterface.removeColumn('Customers', 'isVerified'),
    //   queryInterface.removeColumn('Customers', 'username'),
    // ]);
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

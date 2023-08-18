'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Movements', 'customerId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Customers',
    //     key: 'id',
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Movements', 'customerId');
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

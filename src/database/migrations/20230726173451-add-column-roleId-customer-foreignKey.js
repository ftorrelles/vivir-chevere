'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Customers', 'roleId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Roles',
    //     key: 'id',
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Customers', 'roleId');
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

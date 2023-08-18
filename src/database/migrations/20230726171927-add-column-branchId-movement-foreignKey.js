'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Movements', 'branchId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Branches',
    //     key: 'id',
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Movements', 'branchId');
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

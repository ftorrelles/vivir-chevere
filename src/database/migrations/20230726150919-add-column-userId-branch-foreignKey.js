'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Branches', 'userId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Users',
    //     key: 'id',
    //   },
    //   onDelete: 'SET NULL',
    //   onUpdate: 'CASCADE',
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Branches', 'userId');
  },
};

// esta comentada para evitar problemas en las nuevas migraciones, debido a conflictos de ya esta creada

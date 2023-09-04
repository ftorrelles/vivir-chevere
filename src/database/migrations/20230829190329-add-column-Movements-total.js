'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Movements', 'total', {
    //   type: Sequelize.DECIMAL,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Movements', 'total');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Movements', 'dispatcherId', {
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
    // await queryInterface.removeColumn('Movements', 'dispatcherId');
  },
};

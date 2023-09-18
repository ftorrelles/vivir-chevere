'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'typecustomerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TypeCustomers',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'typecustomerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "Customers" DROP CONSTRAINT "Customers_username_key";'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Customers', {
      fields: ['username'],
      type: 'unique',
      name: 'Customers_username_key',
    });
  },
};

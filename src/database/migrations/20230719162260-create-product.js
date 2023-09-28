'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        measure: {
          type: Sequelize.INTEGER,
        },
        specification_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        price_afiliate: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
          allowNull: false,
        },
        price_general: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
      }),
      queryInterface.addConstraint('Products', {
        fields: ['specification_id'],
        type: 'foreign key',
        name: 'fk_product_specification',
        references: {
          table: 'specifications',
          field: 'id',
        },
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};

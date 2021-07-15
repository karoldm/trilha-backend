'use strict';
const { CategoriesEnum } = require('../../config/categories');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_brand: {
        type: Sequelize.INTEGER,
        references: { model: 'brands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image_uri: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM(Object.values(CategoriesEnum)),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};

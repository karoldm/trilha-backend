'use strict';

require('dotenv').config();

const { generateHash } = require('../../utils/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin',
      password: await generateHash(process.env.ADMIN_PASSWORD),
      is_admin: 1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

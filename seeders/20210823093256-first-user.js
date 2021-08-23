const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => (
    queryInterface.bulkInsert('Users', [{
      login: 'admin',
      password: bcrypt.hashSync('admin', 10),
      email: 'lavrikov2398@gmail.com',
      isAdmin: true,
      color: '#4a148c',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  ),
  down: async (queryInterface) => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};

module.exports = {
  up: async (queryInterface) => {
    const firstUser = await queryInterface.sequelize.query(
      'SELECT id from Users WHERE login="admin";',
    );

    await queryInterface.bulkInsert(
      'Messages',
      [
        {
          text: 'Message 1',
          user: firstUser[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Message 2',
          user: firstUser[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Message 3',
          user: firstUser[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Message 4',
          user: firstUser[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Message 5',
          user: firstUser[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface) => queryInterface.bulkDelete('Messages', null, {}),
};

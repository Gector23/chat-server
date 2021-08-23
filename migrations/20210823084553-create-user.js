module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isAdmin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isMuted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isBlocked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};

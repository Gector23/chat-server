const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Message extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: {
        name: 'user',
      },
    });
  }
}

Message.init({
  text: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'message',
  },
}, {
  sequelize,
  modelName: 'Message',
});

module.exports = Message;

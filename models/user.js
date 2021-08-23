const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class User extends Model {}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  login: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isAdmin: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  isMuted: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  isBlocked: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;

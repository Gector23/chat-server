const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = [{
  _id: ObjectId(),
  isAdmin: true,
  isMuted: false,
  isBlocked: false,
  lastMessageDate: null,
  login: 'Admin',
  email: 'lavrikov2398@gmail.com',
  color: '#4a148c',
  password: bcrypt.hashSync('123321', 10),
}];

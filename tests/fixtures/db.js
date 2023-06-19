const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../../src/config');

const dummyUserId = new mongoose.Types.ObjectId();
const dummyUserData = {
  _id: dummyUserId,
  email: 'pratik@gmail.com',
  password: '123456',
  tokens: [{
    token: jwt.sign({ _id: dummyUserId }, config.jwtSecretKey),
  }],
};

module.exports = {
  dummyUserId,
  dummyUserData,
};

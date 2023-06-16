const { verify } = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

const decryptToken = (req) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = verify(token, jwtSecretKey);
  // eslint-disable-next-line no-underscore-dangle
  return decoded._id;
};

module.exports = decryptToken;

const { verify } = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = verify(token, config.jwtSecretKey);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      console.log('user not found');
    }
    console.log('user found');
    req.user = user;
    res.send(user);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Unauthenticated');
  }
};

module.exports = auth;

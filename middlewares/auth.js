const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (e) {
    const err = new NotAuthorizedError('Необходима авторизация');
    next(err);
  }
  req.user = payload;
  next();
};

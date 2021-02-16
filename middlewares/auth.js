const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { JWT_SECRET } = require('../config');
const { NOT_AUTHORIZED } = require('../errors/ErrorsCodes');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (e) {
    const err = new NotAuthorizedError(NOT_AUTHORIZED);
    next(err);
  }
  req.user = payload;
  next();
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const ExistsError = require('../errors/ExistsError');
const { OK_CODE } = require('../errors/ErrorsCodes');
const { JWT_SECRET } = require('../config');

// получить данные пользователя
const getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch(next);
};

// изменить данные пользователя
const updateUserInfo = (req, res, next) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userData) => {
      if (!userData) { throw new NotCorrectDataError('Переданы некорретные данные для обновления'); }
      res.status(OK_CODE).send(userData);
    })
    .catch(next);
};

// создать нового пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => user.create({
      email,
      password: hash,
      name,
    })
      .then((userData) => {
        res.status(OK_CODE).send({ email: userData.email });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ExistsError('Пользователь с такой почтой существует'));
        }
        if (err.name === 'ValidationError') {
          next(new NotCorrectDataError('Переданы некорректные данные для создания пользователя'));
        }
        next(err);
      }));
};

// войти в пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((userInfo) => {
      if (!userInfo) { throw new NotAuthorizedError('Пользователь не авторизирован'); }
      const token = jwt.sign({ _id: userInfo._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600 * 24 * 7, httpOnly: true, sameSite: true });
      res.status(200).send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

// выйти из пользователя
const logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: -1, httpOnly: true, sameSite: true })
    .send({ message: 'Logged out' })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
  logout,
};

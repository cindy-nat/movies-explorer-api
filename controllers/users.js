const user = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const UserExistsError = require('../errors/UserExistsError');
const { OK_CODE } = require('../errors/ErrorsCodes');

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

module.exports = {
  getUserInfo,
  updateUserInfo,
};

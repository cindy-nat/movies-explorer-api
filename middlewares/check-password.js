const NotCorrectDataError = require('../errors/NotCorrectDataError');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.trim().length === 0) {
    throw new NotCorrectDataError('Поле пароль должно быть заполнено');
  } else {
    next();
  }
};

module.exports = checkPassword;

const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Почта уже используется'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Email должен быть валидным',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле пароль должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле имя должно быть заполнено'],
    minlength: [2, 'Поле имя должно содержать минимум 2 знака'],
    maxlength: [30, 'Поле имя не должно превышать 30 знаков'],
  },
});

module.exports = mongoose.model('user', userSchema);

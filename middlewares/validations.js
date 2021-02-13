const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateSignUpRoute = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Поле name должно содержать минимум 2 знака',
        'string.max': 'Поле name должно содержать максимум 30 знаков',
        'string.required': 'Поле name должно быть заполнено',
      }),
  }),
});

const validateSignInRoute = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'Поле password должно быть заполнено',
      }),
  }),
});

const validateChangeUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Поле name должно содержать минимум 2 знака',
        'string.max': 'Поле name должно содержать максимум 30 знаков',
        'string.required': 'Поле name должно быть заполнено',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.required': 'Поле duration должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.required': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image должно содержать валидную ссылку');
    })
      .messages({
        'string.required': 'Поле image должно быть заполнено',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailer должно содержать валидную ссылку');
    })
      .messages({
        'string.required': 'Поле trailer должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.required': 'Поле movieId должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'Поле nameEN должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail должно содержать валидную ссылку');
    })
      .messages({
        'string.required': 'Поле thumbnail должно быть заполнено',
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateSignUpRoute,
  validateSignInRoute,
  validateChangeUserData,
  validateCreateMovie,
  validateDeleteMovie,
};

const OK_CODE = 200;

const NOT_FOUND_USER = 'Нет пользователя с таким id';
const NOT_CORRECT_USER_DATA = 'Переданы некорретные данные пользователя';
const USER_EXISTS = 'Пользователь с такой почтой существует';
const NOT_AUTHORIZED = 'Пользователь не авторизирован';
const AUTHORIZED = 'Авторизация успешна';
const LOGGED_OUT = 'Пользователь успешно вышел из учетной записи';
const NOT_FOUND_MOVIES = 'Фильмы не найдены';
const NOT_CORRECT_MOVIE_DATA = 'Переданы некорректные данные для добавления фильма';
const FILM_EXISTS = 'Фильм уже добавлен в избранное';
const NOT_FOUND_MOVIE = 'Фильм не найден';
const NO_RIGHTS_MOVIE = 'Вы пытаетесь удалить чужой фильм';

module.exports = {
  OK_CODE,
  NOT_FOUND_USER,
  NOT_CORRECT_USER_DATA,
  USER_EXISTS,
  NOT_AUTHORIZED,
  AUTHORIZED,
  LOGGED_OUT,
  NOT_FOUND_MOVIES,
  NOT_CORRECT_MOVIE_DATA,
  FILM_EXISTS,
  NOT_FOUND_MOVIE,
  NO_RIGHTS_MOVIE,
};

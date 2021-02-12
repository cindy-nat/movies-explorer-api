const movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const UserExistsError = require('../errors/UserExistsError');
const { OK_CODE } = require('../errors/ErrorsCodes');

const getMovies = (req, res, next) => {

}

const createMovie = (req, res, next) => {

}

const removeMovie = (req, res, next) => {

}

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
}

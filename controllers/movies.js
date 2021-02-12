const movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const ExistsError = require('../errors/ExistsError');
const { OK_CODE } = require('../errors/ErrorsCodes');

const getMovies = (req, res, next) => {
  movie.find({owner: req.user._id})
    .then((movies) => {
    if (!movies || movies.length === 0) { throw new NotFoundError('Фильмы не найдены'); }
    res.status(OK_CODE).send(movies);
  })
.catch(next);
}

const createMovieHandler = (req, res, next) => {
  req.body.owner = req.user._id;
  movie.create(req.body)
    .then((movieItem) => {
      if (!movieItem) { throw new NotCorrectDataError('Переданы некорректные данные для добавления фильма'); }
      res.status(OK_CODE).send(movieItem);
    })
    .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new NotCorrectDataError('Переданы некорректные данные для добавления фильма'));
  }
    next(err);
});
}

const createMovie = (req, res, next) => {
  movie.find({movieId: req.body.movieId})
    .then(movies => {
      if (movies.length === 0) {
        createMovieHandler(req, res, next);
      } else {
        movies.forEach(movie => {
          if (movie.owner.toString() === req.user._id) {
            throw new ExistsError('Фильм уже добавлен в избранное')
          } else {
            createMovieHandler(req, res, next);
          }
        })
      }
    })
    .catch(next);
}

const removeMovie = (req, res, next) => {

}

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
}

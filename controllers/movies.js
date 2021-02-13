const movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const ExistsError = require('../errors/ExistsError');
const NoRightsError = require('../errors/NoRightsError');
const {
  OK_CODE,
  NOT_FOUND_MOVIES,
  NOT_CORRECT_MOVIE_DATA,
  FILM_EXISTS,
  NOT_FOUND_MOVIE,
  NO_RIGHTS_MOVIE,
} = require('../errors/ErrorsCodes');

const getMovies = (req, res, next) => {
  movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies || movies.length === 0) { throw new NotFoundError(NOT_FOUND_MOVIES); }
      res.status(OK_CODE).send(movies);
    })
    .catch(next);
};

const createMovieHandler = (req, res, next) => {
  const
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
    } = req.body;
  movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user._id,
    },
  )
    .then((movieItem) => {
      if (!movieItem) { throw new NotCorrectDataError(NOT_CORRECT_MOVIE_DATA); }
      res.status(OK_CODE).send(movieItem);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotCorrectDataError(NOT_CORRECT_MOVIE_DATA));
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  movie.find({ movieId: req.body.movieId })
    .then((movies) => {
      if (movies.length === 0) {
        createMovieHandler(req, res, next);
      } else {
        movies.forEach((movieItem) => {
          if (movieItem.owner.toString() === req.user._id) {
            throw new ExistsError(FILM_EXISTS);
          } else {
            createMovieHandler(req, res, next);
          }
        });
      }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  movie.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE))
    .then((movieItem) => {
      if (movieItem.owner.toString() !== req.user._id) {
        throw new NoRightsError(NO_RIGHTS_MOVIE);
      } else {
        movie.deleteOne(movieItem)
          .then((deletedCard) => res.status(OK_CODE).send(deletedCard));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
};

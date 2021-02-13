const routerMovies = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');

routerMovies.get('', getMovies);
routerMovies.post('', validateCreateMovie, createMovie);
routerMovies.delete('/movieId', validateDeleteMovie, removeMovie);

module.exports = routerMovies;

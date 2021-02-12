const routerMovies = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

routerMovies.get('', getMovies);
routerMovies.post('', createMovie);
routerMovies.delete('/movieId', removeMovie);

module.exports = routerMovies;

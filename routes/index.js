const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const checkPassword = require('../middlewares/check-password');
const { validateSignUpRoute, validateSignInRoute } = require('../middlewares/validations');

router.post('/signup', validateSignUpRoute, checkPassword, createUser);
router.post('/signin', validateSignInRoute, checkPassword, login);

// доступен после авторизации!
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/signout', auth, logout);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;

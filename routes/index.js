const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const checkPassword = require('../middlewares/check-password');

router.post('/signup', checkPassword, createUser);
router.post('/signin', checkPassword, login);

// доступен после авторизации!
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/logout', auth, logout);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;

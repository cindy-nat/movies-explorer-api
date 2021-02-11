const router = require('express').Router();
const userRouter = require('./users');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

// доступен после авторизации!
router.use('/users', auth, userRouter);
router.get('/logout', auth, logout);

const router = require('express').Router();
const userRouter = require('./users');
const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

//доступен после авторизации!
router.use('/users', userRouter);
router.get('/logout', logout);

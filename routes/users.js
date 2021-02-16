const routerUsers = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateChangeUserData } = require('../middlewares/validations');

routerUsers.get('/me', getUserInfo);
routerUsers.patch('/me', validateChangeUserData, updateUserInfo);

module.exports = routerUsers;

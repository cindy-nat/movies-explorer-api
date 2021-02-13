const routerUsers = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

routerUsers.get('/me', getUserInfo);
routerUsers.patch('/me', updateUserInfo);

module.exports = routerUsers;

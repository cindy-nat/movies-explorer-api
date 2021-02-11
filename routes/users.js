const routerUsers = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

routerUsers.get('/me', getUserInfo);
routerUsers.put('/me', updateUserInfo);

module.exports = routerUsers;

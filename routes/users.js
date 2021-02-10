const routerusers = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

routerusers.get('/users/me', getUserInfo);
routerusers.put('/users/me', updateUserInfo);

module.exports = routerusers;

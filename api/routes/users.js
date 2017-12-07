var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')

module.exports = (router) {
	router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
	/* GET users listing. */
	router.get('/lists/', userController.lists);
	/* Add user one. */
	router.post('/add/', userController.add);
};
var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const mdlr = require('../middlewares');

/* GET current user*/
router.get('/all/',  mdlr.verifyToken, userController.getUsers);

/* GET single user. */
router.get('/:username', mdlr.verifyToken, userController.getSingleUser);

/* Add user. */
router.post('/add/', userController.add);

/* UPDATE user. */
router.post('/update/', mdlr.verifyToken, userController.update);

module.exports = router;
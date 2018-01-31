var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const mdlr = require('../middlewares');

/* GET current user*/
router.get('/',  mdlr.verifyToken, userController.getCurrentUser);

/* GET single user. */
router.get('/:username', mdlr.verifyToken, userController.getSingleUser);

/* GET user by key. */
router.get('/filter/:key', mdlr.verifyToken, userController.getUserFilter);

/* Add user. */
router.post('/add/', userController.add);

/* UPDATE user. */
router.post('/update/', mdlr.verifyToken, userController.update);

module.exports = router;
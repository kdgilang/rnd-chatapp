var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const mdlr = require('../middlewares');

router.get('/', function(req, res, next) {
  res.json({message:'signup'});
});


/* GET users listing. */
router.get('/lists/', mdlr.verifyToken, userController.listsPublic);

/* GET user by key. */
router.get('/filter/:key', mdlr.verifyToken, userController.listsByKey);

/* POST user by id. */
router.post('/filter/:id', mdlr.verifyToken, userController.listsPrivate);

/* Add user. */
router.post('/add/', userController.add);

module.exports = router;
var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const middleware = require('../middlewares');

router.use(middleware);

router.get('/', function(req, res, next) {
  res.json({message:'signup'});
});

/* GET users listing. */
router.get('/lists/', userController.listsPublic);

/* GET users listing secure. */
router.post('/lists/', userController.listsPrivate);

/* Add user one. */
router.post('/add/', userController.add);

module.exports = router
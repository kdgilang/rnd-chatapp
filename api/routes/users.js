var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const mdlr = require('../middlewares');

router.get('/', function(req, res, next) {
  res.json({message:'signup'});
});

/* GET users listing. */
router.get('/lists/', mdlr.verify, userController.listsPublic);

/* POST users listing secure. */
router.post('/lists/', mdlr.verify, userController.listsPrivate);

/* Add user. */
router.post('/add/', userController.add);

module.exports = router;
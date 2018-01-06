var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')

router.get('/', function(req, res, next) {
  res.json({message:'signup'});
});

/* GET users listing. */
router.get('/lists/', userController.lists);

/* Add user one. */
router.post('/add/', userController.add);

module.exports = router
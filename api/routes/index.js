const express = require('express');
const middleware = require('../middlewares');
const ctr = require('../controllers');
const router = express.Router();

router.use(middleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Easy Api' });
});

/* AUTH USER */
router.post('/auth/', ctr.auth);
module.exports = router;

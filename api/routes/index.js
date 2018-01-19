const express = require('express');
const mdlr = require('../middlewares');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Easy Api' });
});

/* AUTH USER */
router.post('/auth/', mdlr.auth, mdlr.genereteToken);

module.exports = router;

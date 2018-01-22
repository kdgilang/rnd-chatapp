const express = require('express');
const mdlr = require('../middlewares');
const ctr = require('../controllers');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Easy Api' });
});

/* GET home page. */
router.get('/activation/:data', function(req, res, next) {
  let data = req.params;
  console.log(data);
});

/* Send Activation. */
router.post('/sendactivation', ctr.sendActivation);

/* AUTH USER */
router.post('/auth/', mdlr.auth, mdlr.genereteToken);

module.exports = router;

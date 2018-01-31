const express = require('express');
const mdlr = require('../middlewares');
const ctr = require('../controllers');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Easy Api' });
});

/* verify email. */
router.post('/verification/', ctr.verification);

/* Send Activation. */
router.post('/send-email-verification/', ctr.sendVerification);

/* AUTH USER */
router.post('/auth/', mdlr.auth, mdlr.genereteToken);

/* Messages */
router.post('/message/', mdlr.verifyToken, ctr.message);

module.exports = router;

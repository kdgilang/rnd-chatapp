const router = require('express').Router();
const mdlr = require('../middlewares');
const ctr = require('../controllers/message');

/* Messages */
router.post('/', mdlr.verifyToken, ctr.message);
router.get('/', mdlr.verifyToken, ctr.getMessage);

module.exports = router;
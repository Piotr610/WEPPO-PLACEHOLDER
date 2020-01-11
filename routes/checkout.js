var express = require('express');
var router = express.Router();

/* GET checkout page. */
router.get('/', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});

module.exports = router;

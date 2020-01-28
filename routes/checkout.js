var express = require('express');
var router = express.Router();

/* GET checkout page. */
router.get('/', function (req, res, next) {
    if (req.session.valid) {
        res.render('checkout', { title: 'Checkout', session: req.session })
    } else {
        res.send('Need to log in first!')
    }
});

module.exports = router;

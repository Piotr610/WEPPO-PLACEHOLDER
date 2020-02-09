var express = require('express');
var router = express.Router();
var User = require('../database').User;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.session.admin) {
        User.findAll()
            .then(users => {
                res.render('users', {
                    title: 'Users page',
                    session: req.session,
                    users
                });
            });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

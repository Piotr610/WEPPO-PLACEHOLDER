let express = require('express');
let router = express.Router();
let User = require('../database').User;
let Sequelize = require('sequelize');
let Op = Sequelize.Op;

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

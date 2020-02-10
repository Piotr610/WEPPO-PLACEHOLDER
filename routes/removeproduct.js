var express = require('express');
var router = express.Router();
var Product = require('../database').Product;
var Sequelize = require('sequelize');

router.get('/:id', (req, res, next) => {
    if (req.session.admin) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
});

module.exports = router;

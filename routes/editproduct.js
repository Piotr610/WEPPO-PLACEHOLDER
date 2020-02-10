var express = require('express');
var router = express.Router();
var Product = require('../database').Product;
var Sequelize = require('sequelize');

router.get('/:id', function (req, res, next) {
    if (req.session.admin) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(p => {
            if (p) {
                res.render('editproduct', {
                    product: p,
                    session: req.session
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/')
    }
});

router.post('/:id', (req, res) => {
    const { title, image, description, price } = req.body;
    let errors = [];


    if (req.session.admin) {
        if (!title || !image || !price) {
            errors.push({ msg: 'Please fill in product name and image' });
        }


        Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(product => {
            if (product) {
                product.title = title;
                product.image = image;
                product.description = description;
                product.price = price;

                product.save()
                    .then(p => res.redirect('/'));
            } else {
                errors.push({ msg: 'Product not found' });
            }

            if (errors.length > 0) {
                res.render('editproduct', {
                    product: product,
                    session: req.session
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Product = require('../database').Product;
var Sequelize = require('sequelize');

router.get('/', function (req, res, next) {
    if (req.session.admin) {
        res.render('addproduct', { title: 'Add product', session: req.session });
    } else {
        res.redirect('/')
    }
});

router.post('/', (req, res) => {
    const { title, image, description, price } = req.body;
    let errors = [];

    if (req.session.admin) {
        if (!title || !image || !price) {
            errors.push({ msg: 'Please fill in product name and image' });
        }

        if (errors.length > 0) {
            res.render('addproduct', {
                title: 'Add product',
                session: req.session,
                errors
            });
        } else {
            let product = new Product({
                image,
                title,
                description,
                price
            });

            console.log(product);

            product.save()
                .then(p => res.redirect('/add_product'));
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;

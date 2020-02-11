let express = require('express');
let router = express.Router();
let Product = require('../database').Product;
let Sequelize = require('sequelize');

router.get('/details/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    }).then(p => {
        if (!p) res.send('<h1>404</h1>');

        res.render('index', {
           title: p.title,
           products: [p],
           session: req.session
        });
    });
});

router.get('/add', (req, res, next) => {
    if (req.session.admin) {
        res.render('addproduct', { title: 'Add product', session: req.session });
    } else {
        res.redirect('/')
    }
});

router.post('/add', (req, res) => {
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
            Product.create({
                image,
                title,
                description,
                price
            }).then(p => res.redirect('/product/details/'+p.id));
        }
    } else {
        res.redirect('/');
    }
});

router.get('/remove/:id', (req, res, next) => {
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

router.get('/edit/:id', function (req, res, next) {
    if (req.session.admin) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(p => {
            if (p) {
                res.render('editproduct', {
                    title: 'Edit product',
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

router.post('/edit/:id', (req, res) => {
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
                    title: 'Edit product',
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

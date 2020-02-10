let express = require('express');
let router = express.Router();
let Product = require('../database').Product;
let Sequelize = require('sequelize');

router.get('/add/:id', (req, res, next) => {
    if (!req.session.valid) {
        res.redirect('/login');
    }
    let id = req.params.id;
    if (id)
        if (id in req.session.cart) {
            req.session.cart[id]++;
        } else {
            req.session.cart[id] = 1;
        }
    res.redirect('/cart/checkout');
});

router.get('/remove/:id', (req, res, next) => {
    if (!req.session.valid) {
        res.redirect('/login');
    }
    let id = req.params.id;
    if (id)
        if (id in req.session.cart) {
            req.session.cart[id]--;
            if (req.session.cart[id] == 0) {
                delete req.session.cart[id];
            }
        }
    res.redirect('/cart/checkout');
});

async function get_product(id) {
    return await Product.findOne({
        where: {
            id: id
        },
        raw: true
    });
}

async function get_orders(cart) {
    let orders = [];

    for (const id in cart) {
        orders.push({
            product: await get_product(id),
            amount: cart[id]
        })
    }

    return orders;
}

router.get('/checkout', (req, res, next) => {
    if (req.session.valid) {

        get_orders(req.session.cart).then(o => {
            res.render('checkout', {
                title: 'Checkout page',
                orders: o,
                session: req.session,
                total_price: o.reduce((acc, curr) => acc + (curr.amount * curr.product.price), 0)
            });
        });

    } else {
        res.redirect('/login');
    }
});

module.exports = router;

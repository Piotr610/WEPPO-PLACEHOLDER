let express = require('express');
let router = express.Router();
let Order = require('../database').Order;
let Sequelize = require('sequelize');

router.get('/', (req, res, next) => {
    if (req.session.admin) {
        Order.findAll()
            .then(orders => {
                res.render('orders', {
                    title: 'Orders',
                    session: req.session,
                    orders
                });
            });
    }
    else if (req.session.valid) {
        Order.findAll({
            where: {
                customer: req.session.userid
            }
        }).then(orders => {
            res.render('orders', {
                title: 'Orders',
                session: req.session,
                orders
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/change_status/:id', (req, res, next) => {
    if (req.session.admin) {
        Order.findOne({
            where: {
                id: req.params.id
            }
        }).then(o => {
            o.status = 'sent';
            o.save().then(() => {
                res.redirect('/orders');
            })
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;

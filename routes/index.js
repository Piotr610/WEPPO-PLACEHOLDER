let express = require('express');
let router = express.Router();
let db = require('../database').db;
let Product = require('../database').Product;
let Sequelize = require('sequelize');
let Op = Sequelize.Op;

router.get('/', (req, res) => {
    Product.findAll()
        .then(products =>
            res.render('index', {
                title: 'Shop app',
                products,
                session: req.session
            }))
        .catch(err => console.log(err));
});

router.get('/search', (req, res) => {
    let { term } = req.query;

    term = term.toLowerCase();
    if (term === '') {
        res.redirect('/')
    } else {
        Product.findAll({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('title')), {
                [Op.like]: '%'+term+'%'
            }
            )
        })
            .then(products => res.render('index', {
                title: 'Shop App',
                products,
                session: req.session
            }))
            .catch(err => console.log(err));
    }
})

module.exports = router;

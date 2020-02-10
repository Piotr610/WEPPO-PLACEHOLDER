var express = require('express');
var router = express.Router();
var db = require('../database').db;
var Product = require('../database').Product;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session);
    Product.findAll()
        .then(products =>
            res.render('index', {
                title: 'Shop app',
                products,
                session: req.session
            }))
        .catch(err => console.log(err));
});

// router.get('/add', (req, res, next) => {
//   const data = {
//     image: 'https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg',
//     title: 'Flower',
//     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!',
//     price: 5.21
//   }

//   let { image, title, description, price } = data;

//   Product.create({
//     image,
//     title,
//     description,
//     price
//   })
//     .then(product => res.redirect('/'))
//     .catch(err => console.log(err));
// });

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

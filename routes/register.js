let express = require('express');
let router = express.Router();
let User = require('../database').User;
let Sequelize = require('sequelize');
let Op = Sequelize.Op;
let bcrypt = require('bcrypt');

/* GET register page. */
router.get('/', function (req, res, next) {
    if (req.session.valid) {
        res.redirect('/');
    }
    res.render('register', { title: 'Sign Up', session: req.session });
});

// router.get('/add', (req, res) => {
//   User.create({
//     username: 'Piotr',
//     password: 'haslo'
//   }).then(user => res.redirect('/register'))
//   .catch(err => console.log(err));
// })

router.post('/', (req, res) => {
    const { username, password } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            title: 'Sign Up',
            session: req.session,
            errors
        })
    } else {
        User.findAll({
            where: {
                username: { [Op.like]: username }
            }
        }).then(user => {
            if (user[0]) {
                console.log(user);
                errors.push({ msg: 'User with that username already exists' });
                res.render('register', {
                    title: 'Sign Up',
                    session: req.session,
                    errors
                });
            } else {
                let admin = false;
                const newUser = new User({
                    username,
                    password,
                    admin
                })

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.redirect('/login'));
                }))
            }
        });
        // res.redirect('/login');
    }
})

module.exports = router;

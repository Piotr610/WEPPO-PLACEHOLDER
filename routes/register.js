var express = require('express');
var router = express.Router();
var User = require('../database').User;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Sign Up' });
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
    errors.push({msg: 'Please fill in all fields'});
  }

  if(password.length < 6){
    errors.push({ msg: 'Password should be at least 6 characters'});
  }

  if(errors.length > 0){
    res.render('register', {
      errors
    })
  } else {
    User.findAll({
      where: {
        username: { [Op.like]: username}
      }
    }).then(user => {
      if(user[0]) {
        console.log(user);
        errors.push({ msg: 'User with that username already exists'});
        res.render('register', {
          errors
        });
      } else {
        const newUser = new User({
          username,
          password,
          admin: false
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

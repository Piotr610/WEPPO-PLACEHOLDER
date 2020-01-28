var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


// Database 
const db = require('./database').db;

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var checkoutRouter = require('./routes/checkout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
    name: 'sid',
    secret: 'dhfshserharhestjersefgtafh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: true,
        secure: false
    }
}))

app.use(cookieParser('dhfshserharhestjersefgtafh'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/checkout', checkoutRouter);

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { session: req.session });
});

module.exports = app;

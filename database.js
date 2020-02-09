const Sequelize = require('sequelize');

var db = new Sequelize('shopapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


const User = db.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
}
);

const Product = db.define('product', {
    image: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.FLOAT
    }
}, {
    timestamps: false
});

module.exports = {
    db: db,
    User: User,
    Product: Product
};
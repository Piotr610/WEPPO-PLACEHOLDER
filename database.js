const Sequelize = require('sequelize');

let db = new Sequelize('shopapp', 'root', '', {
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
    },
    norders: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    money_spent: {
        type: Sequelize.FLOAT,
        defaultValue: 0
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

const Order = db.define('order', {
    customer: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    value: {
        type: Sequelize.FLOAT
    },
    json: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'processing'
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
    timestamps: false
});

module.exports = {
    db: db,
    User: User,
    Product: Product,
    Order: Order
};
const express = require('express');
const morgan = require('morgan');
const productsRouter =  require('./routes/products.routes');
const authRouter = require('./routes/auth.routes');
const createRoles = require('./libs/initalSetup');

const app = express();
createRoles();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json('MongoDb Authorization')
})
app.use('/auth', authRouter);
app.use('/products', productsRouter);

module.exports = app


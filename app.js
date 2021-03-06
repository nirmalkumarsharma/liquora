const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const productRoutes = require('./controller/productRouter');
const orderRoutes = require('./controller/orderRouter');
const userRoutes = require('./controller/userRouter');

const applicationConfig = require('./application.json');

const app = express();


const MONGODB_ATLAS_URI_LIQUORA = applicationConfig.env.MONGODB_ATLAS_URI;
mongoose.connect(MONGODB_ATLAS_URI_LIQUORA, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((request, response, next) => {
    const error = new Error('Invalid or Bad Request');
    error.status = 400;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../entity/product');

router.get('/', (request, response, next) => {
    Product.find().exec().then(docs => {
        console.log(docs);
        response.status(200).json(docs);
    }).catch(error => {
        console.log.error;
        response.status(404).json({
            errorMessage: error
        });
    });
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save().then(result => {console.log(result)}).catch(error => console.log(error));
    response.status(201).json({
        message: "Successfully added a new product",
        addedProduct : product
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log("From database", doc);
        if( doc ) {
            response.status(400).json(doc);
        } else {
            response.status(404).json({
                message : "No Found in database"
            });
        }
    }).catch(error => {
        console.log.error;
        response.status(404).json({
            errorMessage: error
        });
    });
});

router.delete('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.remove({_id: id}).exec().then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log.error;
        response.status(404).json({
            errorMessage: error
        });
    });
});

router.patch('/:productId', (request, response, next) => {
    const id = request.params.productId;
    const updateOps = {};

    for ( const ops of request.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: id}, {$set: updateOps}).exec().then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log.error;
        response.status(404).json({
            errorMessage: error
        });
    });
});


module.exports = router;
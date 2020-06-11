const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../entity/order');

router.get('/', (request, response, next) => {
    Order.find().exec().then(docs => {
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
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        items : request.body.items
    });
    order.save().then(result => {console.log(result)}).catch(error => console.log(error));
    response.status(201).json({
        message: "Successfully added a new product",
        addedOrder : order
    });
});

router.get('/:orderId', (request, response) => {
    const id = request.params.orderId;
    Order.findById(id).exec().then(doc => {
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

router.delete('/:orderId', (request, response, next) => {
    const id = request.params.orderId;
    Order.deleteOne({_id: id}).exec().then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log.error;
        response.status(404).json({
            errorMessage: error
        });
    });
});

module.exports = router;


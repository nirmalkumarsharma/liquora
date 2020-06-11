const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: false,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
});

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    items: { type: [itemSchema]},
});

module.exports = mongoose.model('Order', orderSchema);
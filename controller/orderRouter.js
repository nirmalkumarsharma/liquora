const express = require('express');
const router = express.Router();
const orderService = require('../service/orderService');
const checkAuth = require('../security/checkAuth');

router.get('/', checkAuth, orderService.getAllOrders);

router.post('/', checkAuth, orderService.createOrder);

router.get('/:orderId', checkAuth, orderService.getOrder);

router.delete('/:orderId', checkAuth, orderService.deleteOrder);

module.exports = router;


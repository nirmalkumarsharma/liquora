const express = require('express');
const router = express.Router();

const checkAuth = require('../security/checkAuth');
const productService = require('../service/productService')

router.get('/', productService.getAllProducts);

router.post('/', checkAuth, productService.addProduct);

router.get('/:productId', productService.getProduct);

router.delete('/:productId', checkAuth, productService.deleteProduct);

router.patch('/:productId', checkAuth, productService.updateProduct);


module.exports = router;
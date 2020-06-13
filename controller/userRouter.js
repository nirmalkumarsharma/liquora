const express = require('express');
const router = express.Router();

const userService = require('../service/userService')

router.post('/signup', userService.registerUser);

router.delete('/:userId', userService.deleteUser);

router.post('/login', userService.login);

module.exports = router;
const express = require('express');
const router = express().router;
const userController = require('../controllers/userController.js');

router.get('/signup',userController.register);
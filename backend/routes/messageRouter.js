const express = require('express');
import messageController from '../controllers/messageController';

const router = express().router;

router.get('/chat',messageController.getMessagesBetweenUsers);

module.exports = router;

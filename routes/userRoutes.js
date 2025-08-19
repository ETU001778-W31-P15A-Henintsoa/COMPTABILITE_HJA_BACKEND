const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/connexion', userController.loginUser);

module.exports = router;

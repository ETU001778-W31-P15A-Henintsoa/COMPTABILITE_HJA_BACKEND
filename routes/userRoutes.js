const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/connexion', userController.loginUser);
router.post('/create', userController.insertUser);
router.get('/allUsers',userController.getAllUsers);
router.post('/update',userController.updateUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour ajouter un utilisateur
// router.post('/', userController.addUser);
router.post('/utilisateurs', userController.findUser);

module.exports = router;

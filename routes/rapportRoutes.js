const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const rapportController = require('../controllers/rapportController');

// Routes
router.post('/', rapportController.findRapports);

module.exports = router;

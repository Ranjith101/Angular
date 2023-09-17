// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// Define the route for user registration
router.post('/logout', logoutController.logoutUser);

module.exports = router;

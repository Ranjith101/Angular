// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the route for user registration
router.post('/register', userController.registerUser);

module.exports = router;

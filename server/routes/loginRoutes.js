// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Define the route for user registration
router.post('/login', loginController.loginUser);

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const verificationRouter = require('./verification')
const pool = require('./database'); // Import the database connection
const loginRoutes = require('./routes/loginRoutes'); // Replace with the actual path to your login controller
const logoutRoutes = require('./routes/logoutRoutes'); // Replace with the actual path to your login controller

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use the user routes
app.use('/', verificationRouter);
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', logoutRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

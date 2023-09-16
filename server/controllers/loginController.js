const bcrypt = require('bcrypt');
const sql = require('mssql');
const pool = require('../database'); // Import your database connection

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Execute a SQL query to retrieve the user's hashed password and verification status
    const request = pool.request();
    request.input('Email', sql.VarChar(255), email);

    const result = await request.query('SELECT Password, Verified FROM users WHERE Email = @Email');

    if (result.recordset.length === 0) {
      // User not found
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.recordset[0];
    const hashedPassword = user.Password;
    const isVerified = user.Verified === 1;

    // Check if the user is verified and the password is correct
    if (isVerified && await bcrypt.compare(password, hashedPassword)) {
      // Insert a login record into the LoginHistory table
      const insertLoginQuery = `
        INSERT INTO LoginHistory (email, status, login_time)
        VALUES (@Email, 'logged in', GETDATE())
      `;

      const insertLoginRequest = pool.request();
      insertLoginRequest.input('Email', sql.VarChar(255), email);

      await insertLoginRequest.query(insertLoginQuery);

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

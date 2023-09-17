const bcrypt = require('bcrypt');
const sql = require('mssql');
const pool = require('../database'); // Import your database connection

exports.loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    
    // Execute a SQL query to retrieve the user's hashed password and verification status
    const request = pool.request();
    request.input('Email', sql.VarChar(255), Email);

    const result = await request.query('SELECT Password, Verified FROM users WHERE Email = @Email');

    if (result.recordset.length === 0) {
      // User not found
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.recordset[0]; 
    console.log(user,"what wis")
    const hashedPassword = user.Password;
    const isVerified = user.Verified === true;

    // Logging for debugging
    console.log('Email:', Email);
    console.log('Hashed Password from DB:', hashedPassword);
    console.log('isVerified:', isVerified);

    // Check if the user is verified and the password is correct
    if (isVerified) {
      // Log the plain text password before hashing for debugging
      console.log('Plain Text Password:', Password);

      // Compare the plain text password with the hashed password
      const passwordMatch = await bcrypt.compare(Password, hashedPassword);

      // Logging the result of the password comparison
      console.log('Password Match:', passwordMatch);

      if (passwordMatch) {
        // Insert a login record into the LoginHistory table
        const insertLoginQuery = `
          INSERT INTO LoginHistory (email, status, login_time)
          VALUES (@Email, 'logged in', GETDATE())
        `;

        const insertLoginRequest = pool.request();
        insertLoginRequest.input('Email', sql.VarChar(255), Email);

        await insertLoginRequest.query(insertLoginQuery);

        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not verified' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

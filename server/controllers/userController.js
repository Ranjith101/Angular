const sql = require('mssql');
const bcrypt = require('bcrypt');
const pool = require('../database');
const crypto = require('crypto')
const nodemailer =require('nodemailer')

function sendVerificationEmail(userEmail, verificationToken) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Update this to your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: 'snowj0940@gmail.com',
      to: userEmail,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: http://localhost:3001/verify?token=${verificationToken}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });
  }
  

function generateVerificationToken() {
    return crypto.randomBytes(16).toString('hex');
  }
exports.registerUser = async (req, res) => {
    try {
        const { Name, Number, Email, Password } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Execute a SQL query to insert the user
        const request = pool.request();
        request.input('Name', sql.VarChar(255), Name);
        request.input('Number', sql.VarChar(20), Number);
        request.input('Email', sql.VarChar(255), Email);
        request.input('Password', sql.VarChar(255), hashedPassword);

        // Use try...catch to handle SQL query errors
        try {
            await request.query('INSERT INTO users (Name, Number, Email, Password, Verified) VALUES (@Name, @Number, @Email, @Password, 0)');
            console.log('User registered successfully');
            
            // Generate a verification token
            const verificationToken = generateVerificationToken();

            // Store the verification token in your database
            const updateVerificationTokenRequest = pool.request();
            updateVerificationTokenRequest.input('Email', sql.VarChar(255), Email);
            updateVerificationTokenRequest.input('VerificationToken', sql.VarChar(64), verificationToken);

            // Execute a SQL query to update the user's verification token and set Verified to 0
            await updateVerificationTokenRequest.query(`
              UPDATE users
              SET VerificationToken = @VerificationToken, Verified = 0
              WHERE Email = @Email
            `);

            // Send a verification email
            sendVerificationEmail(Email, verificationToken);

            res.status(200).json({ message: 'User registered successfully' });
        } catch (sqlError) {
            console.error('Error executing SQL query:', sqlError);
            res.status(500).json({ message: 'Error registering user' });
        }
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

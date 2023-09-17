const sql = require('mssql');
const pool = require('../database'); // Import your database connection

exports.logoutUser = async (req, res) => {
  try {
    const { Email } = req.body;

    // Find the latest login record for the user with 'logged in' status
    const findLatestLoginQuery = `
      SELECT TOP 1 *
      FROM LoginHistory
      WHERE email = @Email AND status = 'logged in'
      ORDER BY login_time DESC
    `;

    const findLatestLoginRequest = pool.request();
    findLatestLoginRequest.input('Email', sql.VarChar(255), Email);

    const latestLoginResult = await findLatestLoginRequest.query(findLatestLoginQuery);

    if (latestLoginResult.recordset.length === 0) {
      // No 'logged in' record found
      return res.status(400).json({ message: 'No active session found' });
    }

    const latestLogin = latestLoginResult.recordset[0];
    const loginTime = latestLogin.login_time;

    // Update the login history record with 'logged out' status and current time
    const updateLogoutQuery = `
      UPDATE LoginHistory
      SET status = 'logged out', logout_time = GETDATE()
      WHERE id = @LoginId
    `;

    const updateLogoutRequest = pool.request();
    updateLogoutRequest.input('LoginId', sql.Int, latestLogin.id);

    await updateLogoutRequest.query(updateLogoutQuery);

    // Calculate the total time spent
    const logoutTime = new Date();
    const totalMillisecs = logoutTime - loginTime;
    const totalHours = totalMillisecs / (1000 * 60 * 60); // Convert milliseconds to hours

    res.status(200).json({ message: 'Logout successful', total_time_spent: totalHours });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
};

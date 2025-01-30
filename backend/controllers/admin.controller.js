const db = require('../config/db.config');

exports.addAdminEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Insert email into allowed_admins table
    await db.execute('INSERT INTO allowed_admins (email) VALUES (?)', [email]);
    res.status(201).json({ message: `Email ${email} added as admin.` });
  } catch (err) {
    console.error('Error adding admin:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

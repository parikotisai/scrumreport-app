// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const User = require('../models/user.model');
// require('dotenv').config();

// // Securely store JWT in cookies
// const setTokenCookie = (res, token) => {
//   res.cookie("token", token, {
//     httpOnly: true, // Prevents access via JavaScript (XSS protection)
//     secure: process.env.NODE_ENV === "production", // Enforce HTTPS in production
//     sameSite: "Strict", // CSRF protection
//     maxAge: 60 * 60 * 1000, // 1 hour expiration
//   });
// };

// // Signup function
// exports.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.error('Validation errors:', errors.array());
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, username, password, role } = req.body;
//   const userRole = role || 'intern'; // Default role to intern if not provided

//   try {
//     // Check if the user already exists
//     const existingEmail = await User.findByEmail(email);
//     const existingUser = await User.findByUsername(username);
    
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already taken. Please choose a different one.' });
//     }
//     if (existingEmail) {
//       return res.status(400).json({ error: 'Email already in use. Please choose a different one.' });   
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     await User.create({ email, username, password: hashedPassword, role: userRole });

//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (err) {
//     console.error('Signup error:', err.message); // Log the actual error for debugging
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// // Login function
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findByUsername(username);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }
//     console.log(`Login Attempt by user: ${username}`);



//     // Generate a JWT token valid for 1 hour
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     console.log(`Generated Token for ${username}: ${token}`); // ✅ Debugging log
//     // Securely store the token in a cookie
//     setTokenCookie(res, token);


//     // Return the token along with user details
//     res.json({ 
//       message: 'Login successful!', 
//       token: `Bearer ${token}`,
//       user: {
//         id: user.id, 
//         email: user.email, 
//         username: user.username, 
//         role: user.role 
//       } 
//     });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// // 🛡️ Logout Function (Clears Cookie)
// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logout successful" });
// };

// // 🛡️ Secure Profile Fetch (Requires Authentication)
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }
    
//     res.json({
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role
//     });

//   } catch (err) {
//     console.error('Profile error:', err.message);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };



// // localStorage.removeItem('token');
// // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// Admin Role 

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const User = require('../models/user.model');
// require('dotenv').config();

// /**
//  * 🛡️ Securely store JWT in cookies
//  */
// const setTokenCookie = (res, token) => {
//   res.cookie("token", token, {
//     httpOnly: true, // Prevents XSS attacks
//     secure: process.env.NODE_ENV === "production", // Enforce HTTPS in production
//     sameSite: "Strict", // Prevents CSRF attacks
//     maxAge: 60 * 60 * 1000, // 1 hour expiration
//   });
// };

// /**
//  * 📝 Signup Function (Uses Database for Allowed Admins)
//  */
// exports.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, username, password } = req.body;
//   let assignedRole = 'intern'; // Default role for new users

//   try {
//     // ✅ Check if the email is listed in the allowed_admins table
//     const isAdmin = await User.isAllowedAdmin(email);
//     if (isAdmin) {
//       assignedRole = 'admin';
//     }

//     // Prevent duplicate accounts
//     const existingEmail = await User.findByEmail(email);
//     const existingUser = await User.findByUsername(username);

//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already taken. Please choose a different one.' });
//     }
//     if (existingEmail) {
//       return res.status(400).json({ error: 'Email already in use. Please choose a different one.' });
//     }

//     // Hash password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user with assigned role
//     const newUser = await User.create({ email, username, password: hashedPassword, role: assignedRole });

//     console.log(`✅ New user registered: ${username} as ${assignedRole}`);

//     res.status(201).json({ message: `User registered successfully as ${assignedRole}.` });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// /**
//  * 🔑 Login Function
//  */
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findByUsername(username);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     console.log(`✅ Login Attempt: ${username} | Role: ${user.role}`);

//     // Generate JWT token (valid for 1 hour)
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     console.log(`🔐 Token generated for ${username}`);

//     // Securely store token in cookie
//     setTokenCookie(res, token);

//     // ✅ Store user role & ID in response for frontend storage
//     res.json({ 
//       message: 'Login successful!', 
//       token: `Bearer ${token}`,
//       user: {
//         id: user.id, 
//         email: user.email, 
//         username: user.username, 
//         role: user.role 
//       } 
//     });

//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// /**
//  * 🚪 Logout Function
//  */
// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logout successful" });
// };

// /**
//  * 🛡️ Secure Profile Fetch
//  */
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     res.json({
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role
//     });

//   } catch (err) {
//     console.error('Profile error:', err.message);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
require('dotenv').config();

/**
 * 🛡️ Securely store JWT in cookies
 */
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // Enforce HTTPS in production
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour expiration
  });
};

/**
 * 📝 Signup Function (Uses Database for Allowed Admins & Managers)
 */
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;
  let assignedRole = 'intern'; // Default role for new users

  try {
    // ✅ Check if the email is listed in the `allowed_admins` table
    const isAdmin = await User.isAllowedAdmin(email);
    if (isAdmin) {
      assignedRole = 'admin';
    } else {
      // ✅ Check if the email is listed in the `allowed_managers` table
      const isManager = await User.isAllowedManager(email);
      if (isManager) {
        assignedRole = 'manager';
      }
    }

    // Prevent duplicate accounts
    const existingEmail = await User.findByEmail(email);
    const existingUser = await User.findByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken. Please choose a different one.' });
    }
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use. Please choose a different one.' });
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with assigned role
    const newUser = await User.create({ email, username, password: hashedPassword, role: assignedRole });

    console.log(`✅ New user registered: ${username} as ${assignedRole}`);

    res.status(201).json({ message: `User registered successfully as ${assignedRole}.` });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

/**
 * 🔑 Login Function
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    console.log(`✅ Login Attempt: ${username} | Role: ${user.role}`);

    // Generate JWT token (valid for 1 hour)
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`🔐 Token generated for ${username}`);

    // Securely store token in cookie
    setTokenCookie(res, token);

    // ✅ Store user role & ID in response for frontend storage
    res.json({ 
      message: 'Login successful!', 
      token: `Bearer ${token}`,
      user: {
        id: user.id, 
        email: user.email, 
        username: user.username, 
        role: user.role 
      } 
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

/**
 * 🚪 Logout Function
 */
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

/**
 * 🛡️ Secure Profile Fetch
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


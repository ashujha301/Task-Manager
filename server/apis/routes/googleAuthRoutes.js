// googleAuthRoutes.js

const express = require('express');
const passport = require('../../passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

// Initiate Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle callback from Google
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate JWT for the authenticated user
    const token = jwt.sign({ id: req.user._id }, secret_key, { expiresIn: '1d' });

    // Redirect or send the token
    res.redirect(`http://localhost:5173/dashboard`); // Example: redirect with token
    // or res.json({ token }); // Example: send token as JSON
  }
);

module.exports = router;

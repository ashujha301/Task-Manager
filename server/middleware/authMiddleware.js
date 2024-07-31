// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

const authMiddlewarefunc = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token.replace('Bearer ', ''), secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Store user information in req for further use
    req.user = decoded;

    // Call next callback function
    next();
  });
};

module.exports = authMiddlewarefunc;

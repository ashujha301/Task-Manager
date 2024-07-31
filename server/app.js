// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const passport = require('./passport'); // Include passport configuration
const { mongodbClient } = require('./config/mongodbConfig');
const authRoutes = require('./apis/routes/authRoutes');
const unAuthRoutes = require('./apis/routes/unAuthRoutes');
const authMiddlewarefunc = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Session setup
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api', authMiddlewarefunc, authRoutes);
app.use('/', unAuthRoutes);

// Google OAuth routes
const googleAuthRoutes = require('./apis/routes/googleAuthRoutes');
app.use('/auth', googleAuthRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

// MongoDB connection
mongodbClient.catch(error => {
  console.error(error);
});

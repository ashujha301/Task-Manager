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

//Allowed curls:-
const allowedOrigins = [
  'https://task-manager-zeta-mocha.vercel.app',
  'http://localhost:5173',
  'http://54.91.2.78:5173',
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

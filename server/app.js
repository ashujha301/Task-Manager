const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require('./apis/routes/authRoutes');
const unAuthRoutes = require('./apis/routes/unAuthRoutes');
const authMiddlewarefunc = require('./middleware/authMiddleware');
const app = express();

require('dotenv').config();

//app.use(express.json()); // for parsing application/json
app.use(bodyParser.json());

//cors option
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

const port = 5000;

//routes
app.use('/user',authMiddlewarefunc,authRoutes);
app.use('/',unAuthRoutes);


app.listen(port, ()=>{
    console.log(`server is running on Port ${port}`);
});

const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const mongodbClient = mongoose.connect(uri);

mongodbClient.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports = {mongodbClient};
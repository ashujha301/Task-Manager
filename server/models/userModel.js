const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Provide Email"],
    unique: true
  },
  name: { 
    type: String,
    required: [true, 'Please provide your name'],
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: [true, "Enter a Password"]
  }
},
{ timestamps: true }
); 

const USER = new mongoose.model('USER', userSchema);
module.exports = USER;

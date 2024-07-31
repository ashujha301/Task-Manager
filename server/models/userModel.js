// userModel.js

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
    required: function() { return !this.googleId; } // Only required if googleId is not present
  },
  googleId: {
    type: String,
    unique: true,
  }
}, 
{ timestamps: true }
); 

const USER = mongoose.model('USER', userSchema);
module.exports = USER;

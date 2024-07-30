const express = require("express");
const bcrypt = require("bcrypt");
const USER = require("../../models/userModel");
const CODE = require("../../models/codeModel");

//ENV file
require('dotenv').config();

//------------------------------------------------------------XX Register User  XX-----------------------------------------------------------
const registerUser = async (email, name, password) => {
  try {
    // Check if the email already exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      throw new Error("Email already exists");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new USER({
      email: email,
      name: name,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

//------------------------------------------------------------XX Authenticate User  XX-----------------------------------------------------------
const authenticateUser = async (email, password) => {
  try {
    const user = await USER.findOne({ email });

    if (!user && (await bcrypt.compare(password, user.password))) {
      throw new error("Invalid email and password");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

//only for checking

const getusers = async (id) => {
  const user = await USER.findById(id);

  if (!user) {
    throw new Error("No user found!"); //error res is not defined
  }
  return user;
};

//------------------------------------------------------------XX  all codes of user  XX-----------------------------------------------------------

const getUserCodes = async (userId) => {
  try {
    const codes = await CODE.find({ userReference: userId });

    return codes.map((code) => ({ name: code.name }));
    
  } catch (error) {
    throw new Error("Error fetching codes by user");
  }
};


module.exports = {
  registerUser,
  authenticateUser,
  getusers,
  getUserCodes,
};


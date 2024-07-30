const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();
//services to be imported
const userServices = require('../services/userServices');

const secret_key = process.env.SECRET_KEY;


const register = async (req,res) =>{
    try {
        let {email , name, password} = req.body;
        
        if(!email || !name || !password){
            return res.status(400).json({msg : "Please provide all fields"}); 
        }

        const newuser = await userServices.registerUser(email, name, password);
        
        if(newuser.existingUser){
            res.status(201).json({msg: 'User already exists'});
        }
        
        res.status(200).json({message: 'User created successfully', user : newuser})
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server error');
    }
};

const login = async (req,res) =>{
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const user = await userServices.authenticateUser(email, password);

        const token = jwt.sign({id: user._id},secret_key,{expiresIn: '1d'});

        res.status(200).json({message:'User Logged in Succesfully',userId:user._id, username:user.name,token});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {login, register};
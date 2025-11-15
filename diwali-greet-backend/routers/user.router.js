const express = require('express');
const { userModel } = require('../models/user.models');
const userRouter = express.Router();

userRouter.post('/createUser', (req, res) => {
    try{
        userModel.create(req.body).then((response) => {
            res.status(201).json({
                Message: "user is created successfully", 
                Status: "success",
                data: response,
            });
        })
    }
    catch(error){
       res.status(500).json({
        Message: "something went wrong", 
        Status: 'error'
     });
    }
});

userRouter.post('/login', async (req, res)=>{
    try{
       const {email, password} = req.body;
       if(!email || !password){
         return res.status(400).json({
            Message: "Email and password is required", 
            Status: "error"
        });
         
       }

        const user = await userModel.findOne({ email });
        if(!(user && (await user.comparePassword(password)))){
            return res.status(401).json({
                 Message: 'email or password do not match',
                Status: "error"
                });
        }
        const token = await user.generateJWTToken()
        res.cookie("token", token);
        
       return res.status(200).json({
            Message: "user logged in succesfully",
            success: true,
            token: token,
        });
    }
    catch(error){
        res.status(500).json({
            Message: "Something went wrong", 
            Status: `error ${error}`
        });
    }
});

module.exports = {userRouter};
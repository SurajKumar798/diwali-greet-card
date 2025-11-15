const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  //removes whitespace
        validate: {
            validator: validator.isEmail,
            message: "please provide a valid email address",
        },
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods = {
    comparePassword: async function(plainPassword){
        return await bcrypt.compare(plainPassword, this.password)  //compare between normal password with encrypted password
    },
    generateJWTToken: async function(){
        return await jwt.sign({id: this._id, email: this.email}, "suraj@123", );  //here suraj@123 is secret key and it can be different and it should be unique.
         
    },
};
const userModel = mongoose.model("User", userSchema);
module.exports = {userModel};


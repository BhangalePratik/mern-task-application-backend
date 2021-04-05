const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
    },
    "email" : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Email Validation Failed");
            }
        }
    },
    "password" : {
        type : String,
        required : true,
        minLength : 6,
        trim : true,
        validate(password){
            if(password === 'password'){
                throw new Error("Dont put password in password field");
            }
        }
    },
    "age" : {
        type : Number,
        min : 0,
        max : 100,
    },
    "tokens" : [
        {
            "token" : {
                type : String,
                required : true,
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function (){
    try {
        const user = this;
        const token = jwt.sign({_id : user._id.toString()},config.jwtSecretKey,{expiresIn : '1 hour'});
        user.tokens.push({ token });
        await user.save();
        return [token,""];
    } catch(error){
        return ["",error];
    }

}

userSchema.statics.findByCredentials = async function(email,password) {
    try {
        const user = await User.findOne({ email});
        let msg = "";

        if(!user){
            msg = "user not found with the given email id";
        } else {
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                msg = "User entered wrong password";
            } else {
                return ["",user];
            }
        }
        return [msg,{}];
    } catch (error){
        console.log("error occurred while logging in",error);
        return ["error occurred while logging in", false];
    }
}

// To do operation before saving it or updating it.
userSchema.pre('save',async function (next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
})

const User = new mongoose.model('User',userSchema);

module.exports = User;
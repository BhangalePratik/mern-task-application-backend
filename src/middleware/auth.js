const jwt = require('jsonwebtoken');
const user = require('../models/user');
const config = require('../config');
const User = require('../models/user');

const auth =async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,config.jwtSecretKey);
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token});
        if (!user){
            return console.log("user not found");
        } else {
            console.log("user found");
            req.user = user;
            res.send(user);
        }
        next();
    } catch(error){
        console.log(error);
        res.status(401).send("Unautheticated");
    } 
}  

module.exports = auth
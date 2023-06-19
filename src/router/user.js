const express = require('express');

const router = express.Router();
const User = require('../models/user');
const decryptToken = require('../helper/decrypt_jwt_token');
// const auth = require('../middleware/auth');

router.post('/users/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    const [token, error] = await newUser.generateAuthToken();
    if (error) {
      console.log('Error Occurred', error);
      return res.status(500).send('Error Occurred');
    }
    console.log('Signed Up successfully', token);
    return res.status(201).send(token);
  } catch (error) {
    console.log('Error Occurred', error);
    return res.status(500).send('Error Occurred');
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const [msg, user] = await User.findByCredentials(req.body.email, req.body.password);
    if (msg) {
      console.log(msg);
      return res.status(404).send(msg);
    }
    // console.dir(user);
    const [token, error] = await user.generateAuthToken();
    if (error) {
      console.log('Error Occurred', error);
      return res.status(404).send('Error Occurred');
    }
    console.log('Logged In successfully for 10 minutes');

    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error while logging in');
  }
});

router.post('/users/logout', async (req, res) => {
  try {
    const userSessionToken = req.header('Authorization').replace('Bearer ', '');
    const userId = await decryptToken(req);

    const user = await User.findById(userId);

    user.tokens = user.tokens.filter((token) => token.token !== userSessionToken);
    await user.save();
    res.send('Logout Successfully');
  } catch (error) {
    console.log(`Error occurred while logging out : ${error?.message}`);
    res.status(500).send('Logging out failed');
  }
});

// router.post("/users",async (req,res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).send("New user added successfully to the data");
//         console.log("New user added successfully to the data");
//     } catch(error){
//         console.log("Error Occurred While Adding User\n",error);
//         res.status(400).send(`Error Occurred While Adding User : \n ${error}`);
//     }
// });

// router.get("/users",auth,async (req,res)=>{

//     try {
//         const results = await  User.find({});
//         if(!results){
//             console.log('No user found');
//             return res.status(404).send("No user found");
//         }
//         console.log('User found successfully');
//         res.send(results);
//     } catch(error){
//         console.log('Error Occured while finding Users',error);
//         res.status(500).send("Issue Occurred at Server Side While Finding User");
//     }
// })

// router.get("/users/:id",async (req,res)=>{

//     try {
//         const results = await User.findById(req.params.id);
//         console.log(results);

//         if(!results){
//             console.log('No user found');
//             return res.status(404).send("No user found");
//         }
//         console.log('User found successfully');
//         res.send(results);
//     } catch(error){
//         console.log('Error Occured while finding Users',error);
//         res.status(500).send("Issue Occurred at Server Side While Finding User");
//     }
// })

// router.patch("/users/:id", async (req,res)=>{
//     try {
//         const allowedUpdates = ['password','email'];
//         const userUpdates = Object.keys(req.body);
//         const validOperations = userUpdates.every((userUpdate)=>allowedUpdates.includes(userUpdate));

//         if(!validOperations){
//             console.log("User updating unknown fields");
//             return res.status(400).send("User updating unknown fields");
//         }

//         const user = await User.findById(req.params.id);
//         await userUpdates.forEach((userUpdate)=> user[userUpdate] =  req.body[userUpdate]);
//         await user.save();

//         if(!user){
//             console.log("No user found with such id. Wrong ID");
//             return res.status(400).send("NO user found with such id. Wrong ID");
//         }
//         console.log("Successfully updated the user info",user);
//         res.status(200).send("Successfully updated the user info");
//     } catch(error){
//         console.log("Error while updating the user",error);
//         res.status(400).send("Error while updating the user");
//     }
// })

// router.delete("/users/:id",async (req,res)=>{
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);

//         if(!deletedUser){
//             console.log("No such user found");
//             return res.status(404).send("No such user found. You had entered invalid id");
//         }
//         console.log("User Deleted Successfully");
//         res.status(200).send("User Deleted Successfully");
//     } catch(error){
//         console.log("Error Occurred while deleting user");
//         res.status(500).send("Error Occurred while deleting user");
//     }
// })

module.exports = router;

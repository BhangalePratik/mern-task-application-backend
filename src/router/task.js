const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post("/tasks",async (req,res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).send("New task added successfully to the data");
        console.log("New task added successfully to the data");
    } catch(error){
        res.status(400).send(`Error Occurred While Adding Task : \n ${error}`);
        console.log("Error Occurred While Adding Task\n",error);
    }
});

router.get("/tasks",async (req,res)=>{
    try {
        const results = await  Task.find({});
        if(!results){
            console.log('No task found');
            return res.status(404).send("No task found");
        }
        console.log('Task found successfully');
        res.send(results);
    } catch(error){
        console.log('Error Occured while finding Task',error);
        res.status(500).send("Issue Occurred at Server Side While Finding Task");
    }
})

router.get("/tasks/:id",async (req,res)=>{
    try {
        const results = await Task.find({_id : req.params.id});
        if(!results){
            console.log('No task found');
            return res.status(404).send("No task found");
        }
        console.log('Task found successfully');
        res.send(results);
    } catch(error){
        console.log('Error Occured while finding Task',error);
        res.status(500).send("Issue Occurred at Server Side While Finding Task");
    }
})

router.patch("/tasks/:id", async (req,res)=>{
    try {
        const allowedUpdates = ['description','completed'];
        const userUpdates = Object.keys(req.body);
        const validOperations = userUpdates.every((userUpdate)=>allowedUpdates.includes(userUpdate)); 
        
        if(!validOperations){
            console.log("User updating unknown fields");
            return res.status(400).send("User updating unknown fields");
        }
        
        const task = await Task.findById(req.params.id);
        await taskUpdates.forEach((taskUpdate)=> user[taskUpdate] =  req.body[taskUpdate]);
        await task.save();
        
        if(!task){
            console.log("No task found with such id. Wrong ID");
            return res.status(400).send("NO task found with such id. Wrong ID");
        }
        console.log("Successfully updated the task info");
        res.status(200).send("Successfully updated the task info");
    } catch(error){
        console.log("Error while updating the task",error);
        res.status(400).send("Error while updating the task");
    }
})

router.delete("/tasks/:id",async (req,res)=>{
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if(!deletedTask){
            console.log("No such task found");
            return res.status(404).send("No such task found. You had entered invalid id");
        }
        console.log("Task Deleted Successfully");
        res.status(200).send("Task Deleted Successfully");
    } catch(error){
        console.log("Error Occurred while deleting task");
        res.status(500).send("Error Occurred while deleting task");
    }
})


module.exports = router;
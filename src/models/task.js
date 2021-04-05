const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    "description" : {
        type : String,
        trim : true,
        required : true
    }, "completed" : {
        type : Boolean,
        required : true,
        trim : true,
    },
});
taskSchema.pre('save',async (next)=>{
    console.log("You can update task before saving");
    next();
})
const Task = new mongoose.model('Task',taskSchema);

module.exports = Task;
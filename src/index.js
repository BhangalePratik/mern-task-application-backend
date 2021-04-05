const express = require('express');
const app = express();
const config = require('./config');


require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const port = process.env.PORT || 8080;

if(config.serverStatus === '503'){
    app.use((_,res,_1)=>{
        res.status(503).send("Currently Unavailable. Server is in Maintenance Mode");
    })
}

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>console.log("Server is listening on port ",port))

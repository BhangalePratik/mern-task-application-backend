const express = require('express');

const app = express();
const cors = require('cors');

require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;

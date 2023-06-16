const express = require('express');

const app = express();
const cors = require('cors');
const config = require('./config');

require('./db/mongoose');

const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const port = process.env.PORT || 8080;

if (config.serverStatus === '503') {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, _) => {
    res.status(503).send('Currently Unavailable. Server is in Maintenance Mode');
  });
}

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log('Server is listening on port ', port));

const express = require('express');

const router = express.Router();

const { Task } = require('../models/task');
const decryptToken = require('../helper/decrypt_jwt_token');

router.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    newTask.createdBy = await decryptToken(req);
    const response = await newTask.save();
    res.status(201).send(response);
    console.log('New task added successfully to the data');
  } catch (error) {
    res.status(400).send(`Error Occurred While Adding Task : \n ${error}`);
    console.log('Error Occurred While Adding Task\n', error);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const createdBy = await decryptToken(req);
    const results = await Task.find({ createdBy });
    if (!results) {
      console.log('No task found');
      return res.status(404).send('No task found');
    }
    return res.send(results);
  } catch (error) {
    console.log('Error Occurred while finding Task', error);
    return res.status(500).send('Issue Occurred at Server Side While Finding Task');
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const results = await Task.find({ _id: req.params.id });
    if (!results) {
      console.log('No task found');
      return res.status(404).send('No task found');
    }
    return res.send(results);
  } catch (error) {
    console.log('Error Occured while finding Task', error);
    return res.status(500).send('Issue Occurred at Server Side While Finding Task');
  }
});

router.patch('/tasks', async (req, res) => {
  try {
    const allowedUpdates = ['date',
      'time',
      'title',
      'details'];
    const { id, ...taskOperations } = req.body;
    const createdBy = await decryptToken(req);
    const taskUpdates = Object.keys(taskOperations);
    const validOperations = taskUpdates.every((taskUpdate) => allowedUpdates.includes(taskUpdate));

    if (!validOperations) {
      console.log('User updating unknown fields');
      return res.status(400).send('User updating unknown fields');
    }

    // const task = await Task.findById(id);
    const task = await Task.find({ _id: id, createdBy });
    taskUpdates.forEach((taskUpdate) => { task[0][taskUpdate] = req.body[taskUpdate]; });
    const response = await task[0].save();

    if (!task[0]) {
      console.log('No task found with such id. Wrong ID');
      return res.status(400).send('NO task found');
    }
    console.log('Successfully updated the task info');
    return res.status(200).send(response);
  } catch (error) {
    console.log('Error while updating the task', error);
    return res.status(400).send('Error while updating the task');
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const createdBy = await decryptToken(req);
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, createdBy });

    if (!deletedTask) {
      console.log('No such task found');
      return res.status(404).send('No such task found. You had entered invalid id');
    }
    console.log('Task Deleted Successfully');
    return res.status(200).send('Task Deleted Successfully');
  } catch (error) {
    console.error(error);
    console.log('Error Occurred while deleting task');
    return res.status(500).send('Error Occurred while deleting task');
  }
});

module.exports = router;

/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const { dummyUserData, dummyUserId } = require('./fixtures/db');
const { Task } = require('../src/models/task');

const dummyTaskId = new mongoose.Types.ObjectId();
const dummyTaskData = {
  _id: dummyTaskId,
  title: 'dummy task',
  details: 'I am dummy task',
  createdBy: dummyUserId,
};

beforeEach(async () => {
  await Task.deleteMany();
  const newTask = new Task(dummyTaskData);
  await newTask.save();
});

test('Adding Task with token', async () => {
  const response = await request(app).post('/tasks').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send({
    title: 'first title',
    details: 'this is the first task we ever created',
  })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.title).toEqual('first title');
});

test('Adding Task without token', async () => {
  await request(app).post('/tasks').send({
    title: 'first title',
    details: 'this is the first task we ever created',
  })
    .expect(400);
});

test('Displaying all tasks to the user with token', async () => {
  await request(app).get('/tasks').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send()
    .expect(200);
});

test('Displaying all tasks to the user without  token', async () => {
  await request(app).get('/tasks').send()
    .expect(500);
});

test('Updating valid fields', async () => {
  const { _id, createdBy, ...dummyTaskOtherData } = dummyTaskData;
  await request(app).patch('/tasks').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send({
    ...dummyTaskOtherData,
    title: 'second title',
    id: _id,
  })
    .expect(200);
});

test('Updating invalid fields', async () => {
  const { _id,createdBy, ...dummyTaskOtherData } = dummyTaskData;
  await request(app).patch('/tasks').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send({
    ...dummyTaskOtherData,
    contributor: 'admin',
    id: _id,
  })
    .expect(400);
});

test('Updating task but passing incorrect task id', async () => {
  const { _id,createdBy, ...dummyTaskOtherData } = dummyTaskData;
  await request(app).patch('/tasks').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send({
    ...dummyTaskOtherData,
    title: 'second task',
    id: dummyUserId,
  })
    .expect(400);
});

test('Deleting task', async () => {
  await request(app).delete(`/tasks/${dummyTaskId}`).set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send()
    .expect(200);
});

test('Deleting task but giving incorrect id', async () => {
  await request(app).delete(`/tasks/${dummyUserId}`).set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send()
    .expect(404);
});

/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { dummyUserData } = require('./fixtures/db');

beforeEach(async () => {
  await User.deleteMany();
  const dummyUser = new User(dummyUserData);
  await dummyUser.save();
});

test('Signing Up', async () => {
  await request(app).post('/users/signup').send({
    email: 'pratikbhangale760@gmail.com',
    password: 'Pratik@123',
  }).expect(201);
});

test('Logging In', async () => {
  await request(app).post('/users/login').send(dummyUserData).expect(200);
});

test('Logging In with incorrect email', async () => {
  await request(app).post('/users/login').send({
    email: 'pratikbhangale760@gmail.com',
    password: dummyUserData.password,
  }).expect(404);
});

test('Logging out with token', async () => {
  await request(app).post('/users/logout').set('Authorization', `Bearer ${dummyUserData.tokens[0].token}`).send()
    .expect(200);
});

test('Logging Out without token', async () => {
  await request(app).post('/users/logout').send().expect(500);
});

module.exports = {
  dummyUserData,
};

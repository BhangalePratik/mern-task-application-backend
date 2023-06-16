const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
taskSchema.pre('save', async (next) => {
  console.log('You can update task before saving');
  next();
});
// eslint-disable-next-line new-cap
const Task = new mongoose.model('Task', taskSchema);

module.exports = {
  Task,
  taskSchema,
};

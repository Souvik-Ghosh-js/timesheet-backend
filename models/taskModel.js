const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true
  },
  task_desc: String,
  priority: String,
  status: String,
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dueDate: Date,
  overdueTime: {String}
  ,
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

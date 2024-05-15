const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true
  },
  member_id: [{
    type: String,
    ref: 'User'
  }],
  team_id: [{
    type: String,
    ref: 'Teams'
  }],
  
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

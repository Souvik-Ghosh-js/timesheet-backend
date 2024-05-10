const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members:  [String],
  members_name: [String],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;

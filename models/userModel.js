const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  number: String,
  department: String,
  designation: String,
  role: String
});
const User = mongoose.model('User', userSchema);

module.exports = User;

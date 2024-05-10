const express = require('express');
const router = express.Router();
const { add_task } = require('../controllers/taskController');
const { authenticate } = require('../passportConfig');

// Route to add a new task
router.post('/add', authenticate, add_task);

module.exports = router;

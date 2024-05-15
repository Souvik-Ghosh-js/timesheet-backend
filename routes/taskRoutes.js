const express = require('express');
const router = express.Router();
const { add_task, get_tasks } = require('../controllers/taskController');
const { authenticate } = require('../passportConfig');

// Route to add a new task
router.post('/add', authenticate, add_task);
router.get('/get/:project_id', authenticate, get_tasks);

module.exports = router;

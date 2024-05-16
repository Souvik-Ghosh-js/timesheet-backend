const express = require('express');
const router = express.Router();
const { add_task, get_tasks , delete_task } = require('../controllers/taskController');
const { authenticate } = require('../passportConfig');

// Route to add a new task
router.post('/add', authenticate, add_task);
router.get('/get/:project_id', authenticate, get_tasks);
router.get('/delete/:taskId' , delete_task)
module.exports = router;

const express = require('express');
const router = express.Router();
const { add_project , get_all_projects } = require('../controllers/projectController');
const { restrictToAdmin } = require('../passportConfig');


// Route to add a new project
router.post('/add', restrictToAdmin ,add_project);
router.get('/get', get_all_projects )


module.exports = router;

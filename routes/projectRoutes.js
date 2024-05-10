const express = require('express');
const router = express.Router();
const { add_project } = require('../controllers/projectController');
const { restrictToAdmin } = require('../passportConfig');


// Route to add a new project
router.post('/add', restrictToAdmin ,add_project);

module.exports = router;

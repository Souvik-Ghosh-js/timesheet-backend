const express = require('express');
const router = express.Router();
const { add_team, show_teams } = require('../controllers/teamController');
const { authenticate } = require('../passportConfig');

// Route to add a new team
router.post('/add', authenticate, add_team);
router.get('/get',show_teams);

module.exports = router;

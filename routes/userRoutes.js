const express = require('express');
const router = express.Router();
const { register, login, getUserList  } = require('../controllers/userController');

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

router.get('/list/:userId?', getUserList);



module.exports = router;

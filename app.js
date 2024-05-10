// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getClient = require('./connection');

// Import route files
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();



// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);


// Set up default route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management System!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

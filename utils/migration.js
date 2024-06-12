const mongooseConnection = require('../connection');
const User = require('../models/userModel');

// Call the migration function after successful connection
mongooseConnection.once('open', async () => {
  try {
    console.log('Connected to MongoDB');

    // Call the migration function to insert sample data
    await migrateData();

    // Close the database connection after migration
    mongooseConnection.close();
  } catch (error) {
    console.error('Error migrating data:', error);
    process.exit(1); // Exit process if migration fails
  }
});

// Migration function to insert sample data
async function migrateData() {
  // Insert sample users
  const users = [
    {
      name: 'John Doe',
      number: '1234567890',
      department: 'IT',
      designation: 'Software Engineer',
      role: 'Developer'
    },
    {
      name: 'Jane Smith',
      number: '9876543210',
      department: 'HR',
      designation: 'HR Manager',
      role: 'Manager'
    }
  ];

  // Insert each user into the database
  for (const userData of users) {
    const user = new User(userData);
    await user.save();
  }

  console.log('Data migration completed successfully');
}

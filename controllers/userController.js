
const { generateToken } = require('../passportConfig');
const User = require('../models/userModel');

// Controller function for user registration
async function register(req, res) {
    try {
      const { name, email, password, number, department, designation, role } = req.body;
      console.log(req.body);
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

  
      // Create a new user
      const newUser = new User({
        name: name,
        email:  email,
        password: password,
        number:number,
        department,
        designation,
        role:role,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

// Controller function for user login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (password === user.password){
      const token = generateToken(user.id); // Pass user ID to generate token

      // Send token along with user information
      res.status(200).json({ message: 'Login successful', token: token, user: user });
    }
    else {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
   
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserList(req, res) {
  try {
    let filter = {};
    const { userId } = req.params;
    if (userId) {
      console.log(userId);
      filter = { _id: userId };
    }
    
    // Fetch users from the database based on the filter
    const users = await User.find(filter);

    // If no users found, return an empty array
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  register,
  login,
  getUserList,

};

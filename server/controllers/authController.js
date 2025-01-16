const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/User")




const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role: role || 'customer', // Default to 'customer' if no role is provided
    });

    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json({
      message: 'User registered successfully.',
      user: { id: savedUser._id, username: savedUser.username, email: savedUser.email, role: savedUser.role },
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error.', error: err.message });
  }
};




  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret_key", { expiresIn: "1h" });
  
    res.status(200).json({ message: "Login successful", token });
  };
  
module.exports = {registerUser,loginUser}
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Ensure these are properly exported
const userController = {
  // createUser: async (req, res) => {
  //   try {
  //     const { fullName, email, password, type } = req.body;

  //     // Check if user already exists
  //     const existingUser = await User.findOne({ email });
  //     if (existingUser) {
  //       return res.status(400).json({ message: 'User already exists' });
  //     }

  //     // Hash password
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);

  //     // Create new user
  //     const newUser = new User({
  //       fullName,
  //       email,
  //       password: hashedPassword,
  //       type
  //     });

  //     await newUser.save();

  //     res.status(201).json({
  //       message: 'User created successfully',
  //       user: {
  //         id: newUser._id,
  //         fullName: newUser.fullName,
  //         email: newUser.email,
  //         type: newUser.type
  //       }
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // },

  getAllUsers: async (req, res) => {
    try {
      // Fetch all users excluding password field
      const users = await User.find({}).select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = userController;
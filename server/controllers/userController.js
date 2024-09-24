// server/controllers/userController.js
const User = require('../models/User');


// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//Update user profile
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//Delete user profile
exports.deleteUser = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
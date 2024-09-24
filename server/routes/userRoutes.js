// server/routes/userRoutes.js
const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController'); // Correct import
const router = express.Router();

// GET all users
router.get('/', getUsers); // This should be correct

// Get user by id
router.get('/:id', getUserById);

// update user by id
router.put('/:id', updateUser);

// delete user by id
router.delete('/:id', deleteUser);

module.exports = router;

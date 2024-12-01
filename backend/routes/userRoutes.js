const express = require('express');
const userController = require('../controllers/userController');
const { 
  validateUserCreation, 
  authMiddleware, 
  adminMiddleware 
} = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure methods are correctly referenced
//router.post('/create', validateUserCreation, userController.createUser);
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

module.exports = router;
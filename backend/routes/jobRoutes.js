const express = require('express');
const { createJob, getAllJobs } = require('../controllers/jobController');
const { 
  authMiddleware, 
  adminMiddleware, 
  employeeMiddleware 
} = require('../middleware/authMiddleware');
const { validateJobCreation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, adminMiddleware, validateJobCreation, createJob);
router.get('/', authMiddleware, employeeMiddleware, getAllJobs);

module.exports = router;
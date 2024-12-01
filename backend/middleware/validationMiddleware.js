const { body, validationResult } = require('express-validator');

// Validation middleware function generator
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};

// Login validation
const validateLogin = validate([
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required')
]);

// User creation validation
const validateUserCreation = validate([
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('type').isIn(['employee', 'admin']).withMessage('Invalid user type')
]);

// Job creation validation
const validateJobCreation = validate([
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('salary').isNumeric().withMessage('Salary must be a number')
]);

module.exports = {
  validateLogin,
  validateUserCreation,
  validateJobCreation
};
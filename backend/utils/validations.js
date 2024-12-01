// Custom validation utility functions

// Email validation
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password strength validation
  exports.isStrongPassword = (password) => {
    // At least 6 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };
  
  // Name validation
  exports.isValidName = (name) => {
    return name && name.trim().length >= 2;
  };
  
  // User type validation
  exports.isValidUserType = (type) => {
    return ['employee', 'admin'].includes(type);
  };
  
  // Salary validation
  exports.isValidSalary = (salary) => {
    return typeof salary === 'number' && salary > 0;
  };
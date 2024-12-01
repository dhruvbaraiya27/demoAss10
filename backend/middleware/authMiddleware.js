const jwt = require('jsonwebtoken');

// General authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin-only middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
  next();
};

// Employee-only middleware
const employeeMiddleware = (req, res, next) => {
  if (req.user.type !== 'employee') {
    return res.status(403).json({ message: 'Access denied. Employee rights required.' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  employeeMiddleware
};
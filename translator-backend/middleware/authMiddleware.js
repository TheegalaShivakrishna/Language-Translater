const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  // console.log('Auth middleware called');
  // console.log('Headers:', req.headers.authorization ? 'Authorization header present' : 'No authorization header');
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extracted, verifying...');
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, finding user...');
      
      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        console.log('User not found in database');
        return res.status(401).json({ message: 'User not found' });
      }
      
      console.log('User found:', req.user.email);
      return next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  console.log('No valid authorization header found');
  return res.status(401).json({ message: 'No token, authorization denied' });
};

module.exports = {protect};

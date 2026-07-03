

// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// const TokenBlacklist = require('../models/tokenBlacklist.model');

// const protect = async (req, res, next) => {
//   console.log('Cookies received:', req.cookies);

// const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: 'Not authenticated' });
//     }

//     const isBlacklisted = await TokenBlacklist.findOne({ token });
//     if (isBlacklisted) {
//       return res.status(401).json({ message: 'Session expired, please log in again' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'User no longer exists' });
//     }

//     req.user = user;
//     req.token = token; // needed later if we blacklist on logout
//     next();
//   } catch (err) {
//     console.error('Auth middleware error:', err.message);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = protect;
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const TokenBlacklist = require('../models/tokenBlacklist.model');

const protect = async (req, res, next) => {
  try {
    console.log('Cookies received:', req.cookies);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Session expired, please log in again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = protect;
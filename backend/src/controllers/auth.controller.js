const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const TokenBlacklist = require('../models/tokenBlacklist.model');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // never send the password back, even hashed
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
  httpOnly: true,
  secure: true, // hardcode true, not conditional — Render is always HTTPS
  sameSite: 'none', // hardcode none, not conditional — always cross-domain on production
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.decode(token); // just reads payload, no verify needed here
      if (decoded?.exp) {
        await TokenBlacklist.create({
          token,
          expiresAt: new Date(decoded.exp * 1000), // exp is in seconds, Date needs ms
        });
      }
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = { register, login, logout, getMe };
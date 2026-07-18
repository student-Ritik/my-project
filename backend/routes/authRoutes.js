const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Test route
router.get('/test', function(req, res) {
  res.json({ message: 'Auth API Working! ✅' });
});

// SIGNUP
router.post('/signup', async function(req, res) {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Please fill all fields!' 
      });
    }

    // Email pehle se exist karta hai?
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered!' 
      });
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // MongoDB mein save karo
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ 
      message: 'Account created successfully! ✅',
      user: { name, email }
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Server error!', error: error.message 
    });
  }
});

// LOGIN
router.post('/login', async function(req, res) {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ 
        message: 'Please fill all fields!' 
      });
    }

    // Admin check
    if(email === 'admin@indiatravel.com' && 
       password === 'admin@123') {
      return res.status(200).json({ 
        message: 'Admin login successful! ✅',
        role: 'admin',
        token: jwt.sign(
          { email, role: 'admin' }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1d' }
        )
      });
    }

    // Normal user — MongoDB mein dhundo
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ 
        message: 'Email not registered!' 
      });
    }

    // Password verify karo
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ 
        message: 'Wrong password!' 
      });
    }

    // Token banao
    const token = jwt.sign(
      { id: user._id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      message: 'Login successful! ✅',
      role: 'user',
      token,
      user: { name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Server error!', error: error.message 
    });
  }
});

module.exports = router;
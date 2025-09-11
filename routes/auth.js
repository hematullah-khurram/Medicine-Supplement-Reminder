const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

// Register
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

router.post('/register',
  body('username').trim().notEmpty().withMessage('Username required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect('/register');
    }
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      req.session.userId = user._id;
      req.session.username = user.username;
      req.flash('success', 'Welcome! Account created.');
      res.redirect('/');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Registration error (username/email may exist)');
      res.redirect('/register');
    }
  }
);

// Login
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.session.userId = user._id;
    req.session.username = user.username;
    req.flash('success', 'Successfully signed in');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Login error');
    res.redirect('/login');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;

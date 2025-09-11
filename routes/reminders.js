const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { isLoggedIn, isCreator } = require('../middleware/auth');

// Index
router.get('/', isLoggedIn, async (req, res) => {
  const reminders = await Reminder.find({ createdBy: req.session.userId }).sort({ time: 1 });
  res.render('reminders/index', { title: 'My Reminders', reminders });
});

// New
router.get('/new', isLoggedIn, (req, res) => {
  res.render('reminders/new', { title: 'Create Reminder' });
});

// Create
router.post('/', isLoggedIn, async (req, res) => {
  const { name, dosage, description, category, frequency, time } = req.body;
  const reminder = new Reminder({ name, dosage, description, category, frequency, time, createdBy: req.session.userId });
  await reminder.save();
  req.flash('success', 'Reminder created');
  res.redirect('/reminders');
});

// Show
router.get('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const reminder = await Reminder.findById(id).populate('createdBy', 'username');
  if (!reminder) {
    req.flash('error', 'Reminder not found');
    return res.redirect('/reminders');
  }
  res.render('reminders/show', { title: reminder.name, reminder });
});

// Edit
router.get('/:id/edit', isLoggedIn, isCreator, (req, res) => {
  res.render('reminders/edit', { title: 'Edit Reminder', reminder: res.locals.reminder });
});

// Update
router.put('/:id', isLoggedIn, isCreator, async (req, res) => {
  const { id } = req.params;
  const { name, dosage, description, category, frequency, time } = req.body;
  await Reminder.findByIdAndUpdate(id, { name, dosage, description, category, frequency, time });
  req.flash('success', 'Reminder updated');
  res.redirect(`/reminders/${id}`);
});

// Delete
router.delete('/:id', isLoggedIn, isCreator, async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  req.flash('success', 'Reminder deleted');
  res.redirect('/reminders');
});
// API endpoint for reminders (used by notifications.js)
router.get('/api/reminders', isLoggedIn, async (req, res) => {
  const reminders = await Reminder.find({ createdBy: req.session.userId });
  res.json(reminders);
});

module.exports = router;

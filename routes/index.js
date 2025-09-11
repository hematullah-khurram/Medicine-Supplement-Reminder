const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

router.get('/', async (req, res) => {
  let reminders = [];
  if (req.session.userId) {
    reminders = await Reminder.find({ createdBy: req.session.userId }).sort({ time: 1 });
  }
  res.render('index', { title: 'Dashboard', reminders });
});

module.exports = router;

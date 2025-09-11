const Reminder = require('../models/Reminder');

module.exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) return next();
  req.flash('error', 'You must be signed in');
  res.redirect('/login');
};

module.exports.isCreator = async (req, res, next) => {
  const { id } = req.params;
  const reminder = await Reminder.findById(id);
  if (!reminder) {
    req.flash('error', 'Reminder not found');
    return res.redirect('/reminders');
  }
  if (reminder.createdBy.equals(req.session.userId)) {
    res.locals.reminder = reminder;
    return next();
  }
  req.flash('error', 'You do not have permission');
  res.redirect(`/reminders/${id}`);
};

const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  dosage: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { type: String, enum: ['vitamin','supplement','prescription','other'], default: 'other' },
  frequency: { type: String, default: 'daily' },
  time: { type: String }, // "08:00"
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);

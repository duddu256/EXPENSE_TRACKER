const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a description']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Food', 'Investment', 'Fitness', 'Entertainment', 'Utilities', 'Other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
});

module.exports = router;
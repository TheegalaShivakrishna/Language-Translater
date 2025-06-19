const express = require('express');
const Translation = require('../models/Translation.js');

const router = express.Router();

// GET /api/history/:userId — Get history for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await Translation.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;

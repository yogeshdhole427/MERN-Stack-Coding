// routes/pieChart.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/pieChart', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }

    const categoryCounts = await ProductTransaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `^${month}`, $options: 'i' },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(categoryCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve pie chart data' });
  }
});

module.exports = router;

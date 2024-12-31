// routes/barChart.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/barChart', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const results = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await ProductTransaction.countDocuments({
          price: { $gte: range.min, $lte: range.max },
          dateOfSale: { $regex: `^${month}`, $options: 'i' },
        });

        return {
          range: `${range.min}-${range.max}`,
          count,
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve bar chart data' });
  }
});

module.exports = router;

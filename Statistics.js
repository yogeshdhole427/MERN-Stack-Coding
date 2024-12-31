// routes/statistics.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/statistics', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }

    const salesData = await ProductTransaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `^${month}`, $options: 'i' },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: [{ $eq: ['$sold', true] }, '$price', 0] } },
          totalSoldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } },
        },
      },
    ]);

    res.status(200).json(salesData[0] || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve statistics' });
  }
});

module.exports = router;

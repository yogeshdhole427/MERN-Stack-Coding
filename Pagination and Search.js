// routes/transactions.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    const filter = month
      ? { dateOfSale: { $regex: `^${month}`, $options: 'i' } }
      : {};

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const transactions = await ProductTransaction.find({
      ...filter,
      ...searchQuery,
    })
      .skip(skip)
      .limit(limit);

    const totalCount = await ProductTransaction.countDocuments({
      ...filter,
      ...searchQuery,
    });

    res.status(200).json({
      transactions,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / perPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
});

module.exports = router;

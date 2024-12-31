// routes/init.js
const express = require('express');
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/init', async (req, res) => {
  try {
    // Fetch data from third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Save data to the database
    await ProductTransaction.deleteMany({}); // Clear the database first
    await ProductTransaction.insertMany(data);

    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to initialize database' });
  }
});

module.exports = router;

// routes/combined.js
const express = require('express');
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');
const router = express.Router();

router.get('/combined', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }

    // Get statistics
    const stats = await axios.get(`http://localhost:5000/statistics?month=${month}`);
    
    // Get bar chart data
    const barChart = await axios.get(`http://localhost:5000/barChart?month=${month}`);
    
    // Get pie chart data
    const pieChart = await axios.get(`http://localhost:5000/pieChart?month=${month}`);
    
    // Get list of transactions
    const transactions = await ProductTransaction.find({ dateOfSale: { $regex: `^${month}`, $options: 'i' } });

    res.status(200).json({
      transactions,
      stats: stats.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
   

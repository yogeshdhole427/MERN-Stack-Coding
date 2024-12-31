// models/ProductTransaction.js
const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date, // Date of sale (string with year, month, and day)
  sold: Boolean, // Whether the product is sold or not
});

const ProductTransaction = mongoose.model('ProductTransaction', productTransactionSchema);

module.exports = ProductTransaction;

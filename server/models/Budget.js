const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  monthlyLimit: { type: Number, required: true },
  spent: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);

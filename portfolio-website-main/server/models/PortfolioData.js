const mongoose = require('mongoose');

const portfolioDataSchema = new mongoose.Schema({
    type: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('PortfolioData', portfolioDataSchema);

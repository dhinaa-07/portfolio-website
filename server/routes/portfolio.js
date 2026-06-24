const express = require('express');
const router = express.Router();
const PortfolioData = require('../models/PortfolioData');

router.get('/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const data = await PortfolioData.find({ type });
        res.json(data.map(doc => doc.data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        const newMessage = new Message({ firstName, lastName, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, msg: "Message sent successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

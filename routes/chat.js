// routes/chat.js
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/history/:roomId', async (req, res) => {
    try {
        const messages = await Message.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

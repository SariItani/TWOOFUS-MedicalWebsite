// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Remove protect middleware from here since it's now applied in server.js
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

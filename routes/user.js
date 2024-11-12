// routes/user.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Profile route
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
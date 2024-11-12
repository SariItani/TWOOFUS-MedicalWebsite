// routes/diagnosis.js
const express = require('express');
const axios = require('axios');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/mailer');
const router = express.Router();

router.post('/diagnose', protect, async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return res.status(400).json({ message: 'No symptoms provided' });
    }

    try {
        const response = await axios.post(`http://${process.env.DOMAIN}:${process.env.PyPORT}/diagnose`, { symptoms });
        const diagnosis = response.data;

        // Send an email notification with the diagnosis results
        await sendEmail(
            req.user.email,
            'Your Diagnosis Results',
            `Hello ${req.user.username},\n\nYour recent diagnosis results are as follows:\n\n${JSON.stringify(diagnosis.probabilities)}\n\nBest regards,\nThe Team`
        );

        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;

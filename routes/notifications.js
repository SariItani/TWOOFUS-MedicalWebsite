// routes/notifications.js
const express = require('express');
const sendEmail = require('../utils/mailer');
const router = express.Router();

router.post('/welcome', async (req, res) => {
    const { email, username } = req.body;

    try {
        await sendEmail(
            email,
            'Welcome to Our Medical Platform!',
            `Hello ${username},\n\nThank you for signing up! We are here to support your health journey.\n\nBest regards,\nThe Team`
        );
        res.status(200).json({ message: 'Welcome email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
});

router.post('/welcome-login', async (req, res) => {
    const { email, username } = req.body;

    try {
        const currentTime = new Date().toLocaleString();
        await sendEmail(
            email,
            'Newest Login to Our Medical Platform',
            `Hello ${username},\n\nMost Recent Login at ${currentTime}.\n\nBest regards,\nThe Team`
        );
        res.status(200).json({ message: 'Login email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
});

router.post('/diagnosis-update', async (req, res) => {
    const { email, diagnosis } = req.body;

    try {
        await sendEmail(
            email,
            'New Diagnosis Available',
            `Hello,\n\nYour recent diagnosis results are available: ${diagnosis}.\n\nBest regards,\nThe Team`
        );
        res.status(200).json({ message: 'Diagnosis update email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
});

module.exports = router;

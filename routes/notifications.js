// routes/notifications.js
const express = require('express');
const sendEmail = require('../utils/mailer');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/welcome', async (req, res) => {
    const { email, username, userId } = req.body;
    const signupMessage = `Hello ${username},\n\nThank you for signing up! We will support you throughout your health journey.\n\nBest regards,\nThe Team`;
    try {
        await sendEmail(
            email,
            'Welcome to Our Medical Platform!',
            signupMessage
        );
        const notification = new Notification({
            user: userId,
            message: signupMessage,
            type: 'registration',
        });
        await notification.save();
        res.status(200).json({ message: 'Welcome email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
});

router.post('/welcome-login', async (req, res) => {
    const { email, username, userId } = req.body;
    const currentTime = new Date().toLocaleString();
    const loginMessage = `Hello ${username},\n\nMost Recent Login at ${currentTime}.\n\nBest regards,\nThe Team`;
    try {
        await sendEmail(
            email,
            'Newest Login to Our Medical Platform',
            loginMessage
        );
        const notification = new Notification({
            user: userId,
            message: loginMessage,
            type: 'new_login',
        });
        await notification.save();
        res.status(200).json({ message: 'Login email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

router.post('/diagnosis-update', async (req, res) => {
    const { email, diagnosis, userId } = req.body;
    const diagnosisMessage = `Hello,\n\nYour recent diagnosis results are available: ${diagnosis}.\n\nBest regards,\nThe Team`;
    try {
        await sendEmail(
            email,
            'New Diagnosis Available',
            diagnosisMessage
        );
        const notification = new Notification({
            user: userId,
            message: diagnosisMessage,
            type: 'diagnosis_update',
        });
        await notification.save();
        res.status(200).json({ message: 'Diagnosis update email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
});

module.exports = router;

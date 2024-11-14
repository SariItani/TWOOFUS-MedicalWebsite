// routes/dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MedicalProfile = require('../models/MedicalProfile');
const Message = require('../models/Message');
const Diagnosis = require('../models/Diagnosis');
const Notification = require('../models/Notification');

// Remove protect middleware from individual routes since it's now in server.js
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const medicalProfile = await MedicalProfile.findOne({ user: req.user.id });
        res.json({ user, medicalProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/diagnosis-history', async (req, res) => {
    try {
        const diagnoses = await Diagnosis.find({ user: req.user.id })
            .sort({ timestamp: -1 });
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id })
            .sort({ date: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/chat-history', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id },
                { receiver: req.user.id }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/activity-summary', async (req, res) => {
    try {
        const latestDiagnosis = await Diagnosis.findOne({ user: req.user.id })
            .sort({ timestamp: -1 });
        const latestMessage = await Message.findOne({
            $or: [
                { sender: req.user.id },
                { receiver: req.user.id }
            ]
        }).sort({ timestamp: -1 });
        res.json({
            latestDiagnosis,
            latestMessage,
            lastLogin: req.user.lastLogin
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

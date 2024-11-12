// routes/dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MedicalProfile = require('../models/MedicalProfile');
const Message = require('../models/Message');
const Diagnosis = require('../models/Diagnosis');
const Notification = require('../models/Notification');

// Middleware to ensure user is authenticated
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');


// 1. Get Basic Profile Information
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // exclude password
        const medicalProfile = await MedicalProfile.findOne({ user: req.user.id });
        res.json({ user, medicalProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 2. Get Diagnosis History
router.get('/diagnosis-history', protect, async (req, res) => {
    try {
        const diagnoses = await Diagnosis.find({ user: req.user.id }).sort({ timestamp: -1 });
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 3. Get Notifications
router.get('/notifications', protect, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ date: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 4. Get Chat History with Doctors
router.get('/chat-history', protect, async (req, res) => {
    try {
        const messages = await Message.find({ sender: req.user.id }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 5. Activity Summary
router.get('/activity-summary', protect, async (req, res) => {
    try {
        const latestDiagnosis = await Diagnosis.findOne({ user: req.user.id }).sort({ timestamp: -1 });
        const latestMessage = await Message.findOne({ sender: req.user.id }).sort({ timestamp: -1 });
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

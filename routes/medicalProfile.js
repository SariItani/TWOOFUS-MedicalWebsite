// routes/medicalProfile.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize'); // we will just keep this for the demonstration
const MedicalProfile = require('../models/MedicalProfile');

// Only doctors can access this route as an example
router.get('/doctor-access', protect, authorize('doctor'), async (req, res) => {
    res.json({ message: 'Welcome, doctor!' }); // we will just keep this for testing basically
});

// Get the medical profile of the logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const profile = await MedicalProfile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create or update the medical profile
router.post('/', protect, async (req, res) => {
    const { dob, sex, allergies, medications, emergencyContactName, emergencyContactPhone, bloodType, smokingStatus } = req.body;

    const profileFields = {
        user: req.user.id,
        dob,
        sex,
        allergies,
        medications,
        emergencyContactName,
        emergencyContactPhone,
        bloodType,
        smokingStatus,
    };

    try {
        let profile = await MedicalProfile.findOne({ user: req.user.id });
        if (profile) {
            // Update existing profile
            profile = await MedicalProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create a new profile
        profile = new MedicalProfile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

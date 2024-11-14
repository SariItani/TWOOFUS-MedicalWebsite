// routes/medicalProfile.js
const express = require('express');
const router = express.Router();
const MedicalProfile = require('../models/MedicalProfile');

// Get the medical profile of the logged-in user
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
    const {
        dob,
        sex,
        allergies,
        medications,
        emergencyContactName,
        emergencyContactPhone,
        bloodType,
        smokingStatus
    } = req.body;

    // Validation
    if (!dob || !sex || !emergencyContactName || !emergencyContactPhone) {
        return res.status(400).json({ 
            message: 'Required fields missing: date of birth, sex, and emergency contact information are mandatory' 
        });
    }

    const profileFields = {
        user: req.user.id,
        dob,
        sex,
        allergies: allergies || [],
        medications: medications || [],
        emergencyContactName,
        emergencyContactPhone,
        bloodType,
        smokingStatus,
        lastUpdated: Date.now()
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

// Get medical profile by ID (for doctors only)
router.get('/:id', async (req, res) => {
    try {
        // Verify that the requesting user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access forbidden: doctor rights required' });
        }

        const profile = await MedicalProfile.findById(req.params.id)
            .populate('user', 'username email'); // Include basic user info

        if (!profile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update medical profile (doctors can update any profile, users only their own)
router.put('/:id', async (req, res) => {
    try {
        const profile = await MedicalProfile.findById(req.params.id);
        
        if (!profile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }

        // Check if user has permission to update this profile
        if (req.user.role !== 'doctor' && profile.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this profile' });
        }

        const updatedProfile = await MedicalProfile.findByIdAndUpdate(
            req.params.id,
            { 
                $set: { 
                    ...req.body,
                    lastUpdated: Date.now(),
                    lastUpdatedBy: req.user.id
                } 
            },
            { new: true }
        );

        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
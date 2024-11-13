// routes/doctor-dashboard.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DoctorProfile = require('../models/DoctorProfile');
const MedicalProfile = require('../models/MedicalProfile');

// Doctor profile creation/update
router.post('/profile', protect, async (req, res) => {
    const { experience, field, availability, cv, license } = req.body;
    try {
        let doctorProfile = await DoctorProfile.findOneAndUpdate(
            { userId: req.user.id },
            { experience, field, availability, cv, license },
            { new: true, upsert: true }
        );
        res.status(200).json(doctorProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating/updating profile' });
    }
});

// List all patients
router.get('/patients', protect, async (req, res) => {
    try {
        const patients = await MedicalProfile.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patients' });
    }
});

// View individual patient details
router.get('/patients/:id', protect, async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await MedicalProfile.findById(id).populate('user', 'username email'); // Populate user data
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patient details' });
    }
});

module.exports = router;

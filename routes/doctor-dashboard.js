// routes/doctor-dashboard.js
const express = require('express');
const router = express.Router();
const DoctorProfile = require('../models/DoctorProfile');
const MedicalProfile = require('../models/MedicalProfile');

router.post('/profile', async (req, res) => {
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

router.get('/patients', async (req, res) => {
    try {
        // Add verification that the requesting user is actually a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access forbidden: doctor rights required' });
        }
        const patients = await MedicalProfile.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patients' });
    }
});

router.get('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Add verification that the requesting user is actually a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access forbidden: doctor rights required' });
        }
        const patient = await MedicalProfile.findById(id).populate('user', 'username email');
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
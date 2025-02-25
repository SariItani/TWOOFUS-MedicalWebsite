// routes/doctor-dashboard.js
const express = require('express');
const router = express.Router();
const DoctorProfile = require('../models/DoctorProfile');
const MedicalProfile = require('../models/MedicalProfile');

router.post('/profile', async (req, res) => {
    const { experience, field, availability, cv, license } = req.body;
    try { 
        // need to add a get doctor profile for anyone who wants to view the doctors details
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

router.get('/profile/:doctorId', async (req, res) => {
    try {
        const doctor = await DoctorProfile.findOne({ userId: req.params.doctorId });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor profile' });
    }
});

router.post('/availability', async (req, res) => {
    try {
        const doctor = await DoctorProfile.findOneAndUpdate(
            { userId: req.user.id },
            { availability: req.body.availability },
            { new: true, upsert: true }
        );
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error setting availability' });
    }
});

router.get('/availability/:doctorId', async (req, res) => {
    try {
        const doctor = await DoctorProfile.findOne({ userId: req.params.doctorId });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor.availability);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor availability' });
    }
});

router.get('/patients', async (req, res) => {
    try {
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
const express = require('express');
const router = express.Router();
const DoctorProfile = require('../models/DoctorProfile');
const MedicalProfile = require('../models/MedicalProfile');

// Search doctors based on query parameters
router.get('/', async (req, res) => {
    const { specialization, availability, experience } = req.params;

    try {
        const query = {};

        if (specialization) {
            query.specialty = { $regex: specialization, $options: 'i' };
        }
        if (availability) {
            query.availability = { $regex: availability, $options: 'i' };
        }
        if (experience) {
            query.experience = { $gte: Number(experience) };
        }

        const doctors = await DoctorProfile.find(query).userId;
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/recommend', async (req, res) => {
    try {
        // Fetch user medical profile and conditions
        const userProfile = await MedicalProfile.findOne({ user: req.user.id });
        if (!userProfile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }

        // Fetch all doctors
        const doctors = await DoctorProfile.find({ license: { $exists: true } });

        // Compute priority scores
        const recommendations = doctors.map(doctor => {
            let score = 0;

            // Safely check if conditions exist and match
            if (userProfile.conditions && doctor.field && 
                userProfile.conditions.toLowerCase() === doctor.field.toLowerCase()) {
                score += 50;
            }

            // Add points for years of experience
            if (doctor.experience) {
                // Convert experience to number if it's stored as string
                score += Number(doctor.experience) * 10;
            }

            // Check availability
            if (doctor.availability && req.query.availability && 
                doctor.availability.includes(req.query.availability)) {
                score += 10;
            }

            return { doctor, score };
        });

        // Sort recommendations by score in descending order
        recommendations.sort((a, b) => b.score - a.score);

        res.json(recommendations.map(r => r.doctor));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' + error });
    }
});

module.exports = router;

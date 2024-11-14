// routes/diagnosis.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Diagnosis = require('../models/Diagnosis');

router.post('/diagnose', async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return res.status(400).json({ message: 'No symptoms provided' });
    }

    try {
        const response = await axios.post(
            `http://${process.env.DOMAIN}:${process.env.PyPORT}/diagnose`,
            { symptoms }
        );
        const diagnosis = response.data;

        // Send an email notification with the diagnosis results
        await axios.post(
            `http://${process.env.DOMAIN}:${process.env.PORT}/api/notifications/diagnosis-update`,
            {
                email: req.user.email,
                diagnosis: Object.keys(diagnosis.probabilities)[0],
                userId: req.user.id
            }
        );

        const newDiagnosis = new Diagnosis({
            user: req.user.id,
            symptoms,
            diagnosis: Object.keys(diagnosis.probabilities)[0],
            probabilities: diagnosis.probabilities,
        });
        await newDiagnosis.save();

        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await Diagnosis.find({ user: userId }).sort({ timestamp: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diagnosis history' });
    }
});

module.exports = router;

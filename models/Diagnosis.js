// models/Diagnosis.js
const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: { type: [String], required: true },
    diagnosis: { type: String, required: true }, // Main diagnosis result
    probabilities: { type: Map, of: Number },    // Probabilities for each possible diagnosis
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);

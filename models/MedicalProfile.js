// models/MedicalProfile.js
const mongoose = require('mongoose');

const MedicalProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dob: {
        type: Date,
    },
    sex: {
        type: String,
    },
    allergies: {
        type: String,
    },
    medications: {
        type: String,
    },
    emergencyContactName: {
        type: String,
    },
    emergencyContactPhone: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    smokingStatus: {
        type: Boolean,
    }
});

module.exports = mongoose.model('MedicalProfile', MedicalProfileSchema);

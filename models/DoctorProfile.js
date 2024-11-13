const mongoose = require('mongoose');

const DoctorProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    experience: { type: String, required: true },
    field: { type: String, required: true },
    availability: { type: String, required: true },
    cv: { type: String }, // Path to CV file
    license: { type: String }, // Path to license file
});

module.exports = mongoose.model('DoctorProfile', DoctorProfileSchema);

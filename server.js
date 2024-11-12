// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const medicalProfileRoutes = require('./routes/medicalProfile');
const diagnosisRoutes = require('./routes/diagnosis');
const notificationRoutes = require('./routes/notifications');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/medical-profile', medicalProfileRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

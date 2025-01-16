// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const authorize = require('./middleware/authorize');
const ChatContainer = require('./models/ChatContainer');
const Message = require('./models/Message');
const User = require('./models/User');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.static('static'));

const server = http.createServer(app);
const io = socketIo(server);

const { protect } = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const medicalProfileRoutes = require('./routes/medicalProfile');
const diagnosisRoutes = require('./routes/diagnosis');
const notificationRoutes = require('./routes/notifications');
const chatRoutes = require('./routes/chat');
const dashboardRoutes = require('./routes/dashboard');
const doctor_dashboard = require('./routes/doctor-dashboard');
const searchRoutes = require('./routes/search');

const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// General Access level 0
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

// User Access level 1
app.use('/api/user', protect, authorize('doctor', 'user'), userRoutes);
app.use('/api/medical-profile', protect, authorize('doctor', 'user'), medicalProfileRoutes);
app.use('/api/diagnosis', protect, authorize('doctor', 'user'), diagnosisRoutes);
app.use('/api/chat', protect, authorize('doctor', 'user'), chatRoutes);
app.use('/api/dashboard', protect, authorize('doctor', 'user'), dashboardRoutes);
app.use('/api/search', protect, authorize('doctor', 'user'), searchRoutes);

// Doctor Access level 2
app.use('/api/doctor-dashboard', protect, authorize('doctor'), doctor_dashboard);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChat', ({ chatId }) => {
        socket.join(chatId);
        console.log(`User joined chat room: ${chatId}`);
    });

    socket.on('sendMessage', async ({ chatId, senderId, content, attachments }) => {
        try {
            const message = new Message({ chat: chatId, sender: senderId, content, attachments });
            await message.save();

            // Update chat with last message
            const chat = await ChatContainer.findById(chatId);
            chat.messages.push(message._id);
            chat.lastMessage = message._id;
            chat.updatedAt = Date.now();
            await chat.save();

            // Emit to room
            io.to(chatId).emit('message', message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running with HTTP and Socket.IO on port ${PORT}`);
});

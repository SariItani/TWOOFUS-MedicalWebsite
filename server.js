// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
const authorize= require('./middleware/authorize');
const Message = require('./models/Message');

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

// General Access level 0
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

// User Access level 1
app.use('/api/user', protect, authorize('doctor', 'user'), userRoutes);
app.use('/api/medical-profile', protect, authorize('doctor', 'user'), medicalProfileRoutes);
app.use('/api/diagnosis', protect, authorize('doctor', 'user'), diagnosisRoutes);
app.use('/api/chat', protect, authorize('doctor', 'user'), chatRoutes);
app.use('/api/dashboard', protect, authorize('doctor', 'user'), dashboardRoutes);

// Doctor Access level 2
app.use('/api/doctor-dashboard', protect, authorize('doctor'), doctor_dashboard);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a unique room based on conversationId (combination of user and doctor ID or email)
    socket.on('joinRoom', ({ userId, doctorId }) => {
        const conversationId = `${userId}_${doctorId}`;
        socket.join(conversationId);
        console.log(`User joined room: ${conversationId}`);

        // Load existing messages for this conversation
        Message.find({ conversationId })
            .sort({ timestamp: 1 })
            .then(messages => {
                socket.emit('loadMessages', messages);
            })
            .catch(error => console.error('Error loading messages:', error));
    });

    // Listen for message events and emit them to the specific room
    socket.on('chatMessage', ({ conversationId, sender, receiver, message }) => {
        const msgData = { conversationId, sender, receiver, message, timestamp: new Date() };

        io.to(conversationId).emit('message', msgData);

        // Save the message to MongoDB
        saveMessage(msgData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Save message to MongoDB
const saveMessage = async ({ conversationId, sender, receiver, message }) => {
    try {
        const chatMessage = new Message({ conversationId, sender, receiver, message });
        await chatMessage.save();
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

// Start the server
server.listen(process.env.CHAT || 5555, () => {
    console.log(`Chatting rooms running on port ${process.env.CHAT || 5555}`);
});

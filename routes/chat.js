// routes/chat.js
const express = require('express');
const router = express.Router();
const ChatContainer = require('../models/ChatContainer');
const Message = require('../models/Message');
const User = require('../models/User');

// Initiate a new chat
router.post('/initiate', async (req, res) => {
    const { doctorId } = req.body;
    const userId = req.user._id;
    console.log(`Connecting between participants: ${userId} and ${doctorId}`)
    try {
        // Check if a chat already exists
        let chat = await ChatContainer.findOne({
            participants: { $all: [userId, doctorId] }
        });

        // Create a new chat if it doesn't exist
        if (!chat) {
            chat = new ChatContainer({
                participants: [userId, doctorId]
            });
            await chat.save();
        }

        res.status(201).json({ chatId: chat._id, message: 'Chat initiated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});

// Fetch chat history
router.get('/:chatId', async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await ChatContainer.findById(chatId)
            .populate('messages')
            .populate('participants', 'username email');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send a new message
router.post('/:chatId/message', async (req, res) => {
    const { chatId } = req.params;
    const { content, attachments } = req.body;
    const senderId = req.user._id;

    try {
        // Ensure chat exists
        const chat = await ChatContainer.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Create and save message
        const message = new Message({
            chat: chatId,
            sender: senderId,
            content,
            attachments
        });
        await message.save();

        // Update chat container with last message
        chat.messages.push(message._id);
        chat.lastMessage = message._id;
        chat.updatedAt = Date.now();
        await chat.save();

        res.status(201).json({ message: 'Message sent', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

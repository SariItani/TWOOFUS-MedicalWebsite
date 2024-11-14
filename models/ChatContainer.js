// models/ChatContainer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatContainerSchema = new Schema({
    participants: [
        { type: Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    messages: [
        { type: Schema.Types.ObjectId, ref: 'Message' }
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

ChatContainerSchema.index({ 'participants': 1 });

module.exports = mongoose.model('ChatContainer', ChatContainerSchema);

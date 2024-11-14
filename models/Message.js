// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chat: { type: Schema.Types.ObjectId, ref: 'ChatContainer', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    attachments: [{ type: String }], // URLs or paths to files
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);

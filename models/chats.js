const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 50
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true }); // This adds createdAt and updatedAt fields
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;

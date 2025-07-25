const express = require('express');
const mongoose = require('mongoose');
const Chat = require('./models/chats');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost/whatsapp', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}
connectDB().then(() => {
  console.log('DB connection successful');
}). catch(err => {
  console.error('Error during DB connection:', err);

});

let allChats = [
  {
    from: 'Om',
    to: 'Neha',
    message: 'Hello Neha!',
  },
  {
    from: 'Neha',
    to: 'Om',
    message: 'Hi Om!',
  },
  {
    from: 'Om',
    to: 'Neha',
    message: 'How are you?',
  },
    {
        from: 'Neha',
        to: 'Om',
        message: 'I am good, thanks!',
    }
];

Chat.insertMany(allChats)

  .then(() => {
    console.log('Chat messages inserted successfully');
  })
  .catch(err => {
    console.error('Error inserting chat messages:', err);
  });

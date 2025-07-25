const express = require('express');
const mongoose = require('mongoose');
const app = express()
const path = require('path');
const static = require('serve-static');
const Chat = require('./models/chats');
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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

app.get('/chat', async (req, res) => {
   let chats = await Chat.find({});
   res.render('index.ejs', { chats });
}); 
app.get('/chat/new', (req, res) => {
  res.render('new.ejs');

});

app.post('/chat', async (req, res) => {
  let { from, to, message } = req.body;
  let chat = new Chat({ from, to, message });
  await chat.save();
  res.redirect('/chat');
});

app.get('/chat/:id/edit', async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.render('edit.ejs', { chat });
});

app.put('/chat/:id', async (req, res) => {
  let {id} = req.params;
  let { message : newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
  res.redirect('/chat');
});

app.delete('/chat/:id', async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/chat');
});

app.listen(process.env.PORT || 3000, () => { 
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to root route');
});

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// get index/chat folder live
app.use(express.static(path.join(__dirname, 'public')))
const botName = 'chatbot';

// run when client connects
io.on('connect', socket=>{

  socket.on('joinRoom',({username,room})=>{
 //console.log('new WS Connection...')

 socket.emit('message',formatMessage(botName,'welcome to chatbox'));

 // broadcast when a user connects
    socket.broadcast.emit('message',formatMessage(botName,'a user has joined the chat'))
  });
   

  //  show when user dissconnects
socket.on('disconnect', ()=>{
    io.emit('message',formatMessage(botName,'a user has left the chat'))

  
});
// Lisen for message 
socket.on('chatMessage', msg=>{ 
  io.emit('message',formatMessage("USER",msg))
});  
});
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
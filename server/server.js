require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New User connected on ${socket.id}`);
  
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat!'));
  
  socket.broadcast.emit('newMessage',generateMessage('Admin',`${socket.id} join to Chat!`));
  
  socket.on('createMessage', (message, callback) => { 
    console.log('Creaete Message', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is from server');   
  });

  socket.on('createLocationMessage', (coords) => {    
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User dsiconnect');
  });

});

if(!module.parent){
  server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
}
  
module.exports = { app };
  
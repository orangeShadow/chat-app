require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New User connected on ${socket.id}`);
  
  socket.emit('newMessage', {'from':'Admin','message':'Welcome to the chat!'});
  
  socket.broadcast.emit('newMessage',{
      from: 'Admin',
      text: `${socket.id} is with us!!`,
      createdAt: new Date().getTime()
  });    
  
  socket.on('createMessage', (message) => {
    console.log('Create message', message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage',{
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    //   })    
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
  
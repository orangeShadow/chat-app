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
  console.log('New User connected');


  socket.emit('newMessage',{
    from: 'John',
    text: 'See you then?',    
    createdAt: new Date()
  });


  socket.on('createMessage', (message) => {
    console.log('Create message', message);
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
  
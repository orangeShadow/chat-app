require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New User connected on ${socket.id}`);

  socket.on('join', (params, callback) => {
    console.log(params);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat!'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined!`));

    //socket.leave(name)
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is from server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    let user = users.getUser(socket.id);
    users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left!`));
    }
  });

});

if(!module.parent){
  server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
}

module.exports = { app };

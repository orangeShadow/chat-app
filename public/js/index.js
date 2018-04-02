var socket = io();
socket.on('connect', function() {
  console.log('Connected to the Server');

  socket.emit('createMessage', {
    name: 'Andrew',
    text: 'Yup. This is Andrew!',
    createdAt: new Date()
  });

});

socket.on('disconnect', function() {
  console.log('Disconected from server');
});

socket.on('newMessage', function(message){
  console.log('New message',message);
});



let submit = function(e){
    e.preventDefault();
    console.log(this);
}
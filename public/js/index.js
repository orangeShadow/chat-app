var socket = io();
socket.on('connect', function() {
  console.log('Connected to the Server');
});

socket.on('disconnect', function() {
  console.log('Disconected from server');
});


socket.on('newMessage', function(message){
  let li = document.createElement("li");
  li.innerHTML = `${message.from}: ${message.text}`;
  document.getElementById('messages').appendChild(li);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi!'
}, (text)=>{
  console.log(text);
});

let submit = function(e){
  e.preventDefault();
  let text = document.querySelector('input[name="message"]').value;
  let from = 'User';
  socket.emit('createMessage', {
    from,
    text
  }, ()=>{
  });
}

document.getElementById('message-form').addEventListener("submit", submit);

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

socket.on('newLocationMessage', function(message){
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.innerHTML = 'Мое местоположение';
  a.setAttribute('target','_blank');
  a.setAttribute('href',message.url);
  li.innerHTML = `${message.from}: `;
  li.appendChild(a);
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
};

let getLocation = function(e){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{latitude:position.coords.latitude, longitude: position.coords.longitude});
    }, function(){
      alert('Unable to fetch location!');
    });
  } else {
    return alert('Ваш браузер не поддерживает геолокацию!');
  }
};

document.getElementById('message-form').addEventListener("submit", submit);
let locationButton  = document.getElementById('send-location');

locationButton.addEventListener('click', getLocation);


var socket = io();
socket.on('connect', function() {
  console.log('Connected to the Server');
});

socket.on('disconnect', function() {
  console.log('Disconected from server');
});


socket.on('newMessage', function(message){
  var template = document.getElementById('message-template').innerHTML;
  var html = Mustache.render(template,{
    from:message.from,
    time:moment(message.createdAt).format('HH:mm'),
    message:message.text
  });
  document.getElementById('messages').innerHTML+=html;
});

socket.on('newLocationMessage', function(message){
  var template = document.getElementById('location-message-template').innerHTML;
  var html = Mustache.render(template,{
    from:message.from,
    time:moment(message.createdAt).format('HH:mm'),
    url:message.url
  });
  document.getElementById('messages').innerHTML+=html;
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi!'
}, (text)=>{
  console.log(text);
});

var submit = function(e){
  e.preventDefault();
  var button = e.target;
  button.setAttribute('disabled','disabled');
  var messageTextBox =  document.querySelector('input[name="message"]');
  text = messageTextBox.value;
  var from = 'User';
  if (text.length===0) {
    alert('Введите сообщение!');
    return false;
  }
  socket.emit('createMessage', {
    from,
    text
  }, ()=>{
    messageTextBox.value='';
    button.removeAttribute('disabled');
  });
};

var getLocation = function(e){
  var button = e.target;
  if ("geolocation" in navigator) {
    button.setAttribute('disabled','disabled');
    button.innerHTML = 'Отпрвка локации ...';
    navigator.geolocation.getCurrentPosition(function(position){
      button.removeAttribute('disabled',null);
      button.innerHTML = 'Отправить локацию';
      socket.emit('createLocationMessage',{latitude:position.coords.latitude, longitude: position.coords.longitude});
    }, function(){
      button.removeAttribute('disabled',null);
      button.innerHTML = 'Отправить локацию';
      alert('Unable to fetch location!');
    });
  } else {
    return alert('Ваш браузер не поддерживает геолокацию!');
  }
};

document.getElementById('message-form').addEventListener("submit", submit);

var locationButton  = document.getElementById('send-location');
locationButton.addEventListener('click', getLocation);


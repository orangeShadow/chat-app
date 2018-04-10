var socket = io();

var scrollToBottom = function() {
  //Selectors
  var messages    = document.getElementById('messages');
  var newMessage  = messages.children[messages.children.length-1];
  if(typeof (messages.children[messages.children.length-2]) == 'undefined' ) return;
  var lastMessage = messages.children[messages.children.length-2] ;


  //Heights
  var clientHeight  = messages.clientHeight;
  var scrollTop     = messages.scrollTop;
  var scrollHeight  = messages.scrollHeight;

  var newMessageHeight  = newMessage.offsetHeight;
  var lastMessageHeight = lastMessage.offsetHeight;

  if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scroll(0,scrollHeight);
  }
};

socket.on('connect', function() {
  var params = deparam(window.location.search.replace(/^\?/,''));

  socket.emit('join',params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {

    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconected from server');
});

socket.on('updateUserList', function(users){
  //console.log('Users list', users);
  var divUL = document.getElementById('user-list');
  if(divUL) {
    divUL.innerHTML='';
  }
  var ol = document.createElement('ol');
  users.forEach( (item) => {
    let li = document.createElement('li');

    li.innerHTML += item;
    ol.appendChild(li);
  });

  divUL.appendChild(ol);
});
socket.on('newMessage', function(message){
  var template = document.getElementById('message-template').innerHTML;
  var html = Mustache.render(template,{
    from:message.from,
    time:moment(message.createdAt).format('HH:mm'),
    message:message.text
  });
  document.getElementById('messages').innerHTML+=html;
  scrollToBottom();
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

var submit = function(e){
  e.preventDefault();
  var button = e.target;
  button.setAttribute('disabled','disabled');
  var messageTextBox =  document.querySelector('input[name="message"]');
  text = messageTextBox.value;
  var from = deparam(window.location.search.replace(/^\?/,'')).name;
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


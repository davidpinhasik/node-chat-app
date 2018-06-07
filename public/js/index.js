var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message arrived', message);
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'David',
//   text: 'Mincha is at 2:00pm around here'
// }, function (data) {
//   console.log('Got the ackowledgement', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

  var socket = io();

  socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
      from: 'David',
      text: 'Mincha is at 2:00pm around here'
    })
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function (message) {
    console.log('New message arrived', message);
  });

const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin','Hey, welcome to the chat app!!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','A new user just joined the chat app!!!'));

  socket.on('createMessage', (message, callback) => {
    console.log('New message arrived at server from client: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('createLocationMessage', (coords) => {
    console.log('New location message arrived at server from client: ', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin',  coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });

});

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

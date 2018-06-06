const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',{
    from: 'mike@example.com',
    text: 'Hey, when is Mincha around here?',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('New message arrived at server from client: ', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });

});

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

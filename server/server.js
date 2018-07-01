const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users}        = require('./utils/users');

const port = process.env.PORT || 3000;
var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);
var users = new Users();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    };

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.leave('A string value for room name');

    // io.emit (emits to every singlr connected user)
    //    io.to('A room name').emit    (this will emit to everyone connected to this room)
    // socket.broadcast.emit (emits to everyone on socket server except for current user)
    //    socket.broadcast.to('A room name').emit (this emits to everyone connected to the room execpt for current user)
    // socket.emit (emits an event specifically to one user.)
    //    no need to target by room
    socket.emit('newMessage', generateMessage('Admin','Hey, welcome to the chat app!!'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin','A new user just joined the chat app!!!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));
    callback();
  })

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      // io.emit('newMessage', generateMessage(user.name, message.text));
    };

    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,  coords.latitude, coords.longitude));
    };
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

});

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new User is connected');
    
    socket.emit('newMessage', generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin' , 'New user joined'));


    socket.on('createMessage', (message,callback) => {
        console.log('created new message',message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server .');
   
    });

    socket.on('disconnect',() => {
        console.log('User was Disconnected');
    });
});

server.listen(port,() => console.log(`App listening on port ${port}!`));
 
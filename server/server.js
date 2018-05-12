const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new User is connected');
    
    socket.emit('newMessage', {
        from: 'joey@example.com',
        text: 'Hey', 
        createAt: 1323
    });

    socket.on('createMessage', (message) => {
        console.log('created new message',message);
    });

    socket.on('disconnect',() => {
        console.log('User was Disconnected');
    });
});

server.listen(port,() => console.log(`App listening on port ${port}!`));
 
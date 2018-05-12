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
    

    socket.on('createMessage', (message) => {
        console.log('created new message',message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect',() => {
        console.log('User was Disconnected');
    });
});

server.listen(port,() => console.log(`App listening on port ${port}!`));
 
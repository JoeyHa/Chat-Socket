 var socket = io();
 socket.on('connect', function () {
     console.log('Connected to the Server');
    
     socket.emit('createMessage', {
        from: 'Joey',
        text:'Its Working !'
    });
 });
 
 socket.on('disconnect', function () {
     console.log('Disconnected from server');
 });

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});
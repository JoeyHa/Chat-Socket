 var socket = io();

function scrollToButtom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //heights 
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessage = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessage >= scrollHeight ) {
        messages.scrollTop(scrollHeight); 
    };
};


 socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join',params, function (err) {
        if  (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Error');
        }
     });
 });
 
 socket.on('disconnect', function () {
     console.log('Disconnected from server');
 });

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);

});


socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from:message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToButtom();
});

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var locationTemplate = jQuery('#Location-message-template').html();
    var locationHtml = Mustache.render(locationTemplate, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(locationHtml);
    scrollToButtom();
});

var messageTextBox = jQuery('[name = message]');

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function () {
         messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('sending location..');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location') ;
        alert('Unable to fetch location');
        
    });
});

function forceLower(strInput) {
    strInput.value = strInput.value.toLowerCase();
}
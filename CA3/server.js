// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var users = {};

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client){
  console.log('Client connected...');
  client.on('disconnect', function(){
    console.log('Client disconnected...');
  });
  client.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//start our web server and socket.io server listening
server.listen(3001, function(){
  console.log('listening on *:3001');
});


////////////////////////////////////////////////////

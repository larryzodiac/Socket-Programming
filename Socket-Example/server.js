// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 

# Socket-Example
This CA is based on[Andrew Errity's Repository](https://github.com/aerrity/socket-click-example) Tutorials.

## Setting Up a Node Project
We create a new folder name 'Socket-Example' in which to initialise a new project.

We use the Node Package Manager (NPM) to intialise our project by running `npm init` in the command line.

This will prompt us to enter information about our project.

We set our entry point to `server.js`

It will be similar to this:

```
package name: (socket-example)
version: (1.0.0)
description: Demo socket.io project
entry point: (index.js) server.js
test command:
git repository:
keywords:
author: Evan MacHale
license: (ISC)
About to write to C:\Socket-Programming-master\Socket-Programming\Socket-Example\package.json:

{
  "name": "socket-example",
  "version": "1.0.0",
  "description": "Demo socket.io project",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Evan MacHale",
  "license": "ISC"
}


Is this ok? (yes)
```

This will create a `package.json` file in your project folder, containing information about your project and the packages it depends upon.

We will use these packages Express and Socket.io:

```
npm install express --save
npm install socket.io --save
```

These commands will add entries for each package in `package.json` and also install the packages and all their dependencies in a new `node_modules` folder.

## Setting Up a Web Server w/ Express.js
[Express](http://expressjs.com/) is a web application framework for Node.

Create our `server.js` file and add the following code:

```
// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});
```

Start the web server, run `node server.js`

You can then visit http://localhost:3000 in your web browser. The browser will send a GET request for the root folder (/) which will return an error: `Cannot GET /`

To fix this we will add a route. This will direct GET requests for the root directory (/) to the file index.html. Modify server.js as follows:

```
// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  

//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});
```

Create a new folder in your project folder called `public`, add a new file named `index.html` and add the following:

```
<!DOCTYPE html>
<html>
   <head>
      <title>Socket.io Demo</title>
      <meta charset="utf-8">
   </head>
   <body>
		 <h1>Socket.io Demo</h1>	 
   </body>
</html>
```

Restart your server by pressing `Ctrl`+`c` and revisit localhost.

If you needed your server to handle more routes you could add them as needed, e.g.

```
app.get('/users', function(req, res,next) {  
    res.sendFile(__dirname + '/public/users.html');
});
```

would route from http://localhost:3000/users to the file public/users.html.

## Serving Static Files
Another useful feature of Express is its ability to server static files like images, CSS files and JavaScript files. This can be done using `express.static` as shown in the updated `server.js` below:

```
// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});

```

We can now add a styles.css file to our public folder and edit it to contain some styles, then, link it to the html file.

## Adding Socket.io to the Project
[Socket.io](https://socket.io/) is a JavaScript library that provides realtime, bidirectional communciation between web servers and clients. It primarily uses WebSockets as the underlying protocol, but can fallback to simpler polling if WebSockets are not supported by the client/server. It has two parts:

- Client-side library that runs in the browser;
- Server-side library for Node.js.

Documentation can be found on [Socket.io's GitHub](https://github.com/socketio/socket.io/tree/master/docs) and there is also a [cheatsheet](https://gist.github.com/alexpchin/3f257d0bb813e2c8c476) which is useful.

### Server Side
We need to add Socket.io to our server, add the following code to `server.js`

```
// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

//when a client connects, do this
io.on('connection', function(client) {  
    console.log('Client connected...');
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});
```
Side Note: there is a tool named nodemon that will look for changes in your server so you don't have to restart all the time.

Install it using:

`npm install -g nodemon`

Now run `nodemon server.js` in your command line instead of `node server.js`

## Client side
Now we add Socket.io to the client side by modifying `index.html`, add the following code:

```
<!DOCTYPE html>
<html>
   <head>
      <title>Socket.io Demo</title>
      <meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
   </head>
   <body>
		 <h1>Socket.io Demo</h1>	 
		 <p id="text">0 Clients have connecteed</p>
		 <script src="/socket.io/socket.io.js"></script>
		 <script>
			 var socket = io.connect();
		</script>
   </body>
</html>
```

## Sending + Receiving Messages
Two key Socket.io functions are:

- `.emit` Sends messages between server-client(s).
- `.on` Handles incoming messages.

Now we update the client with the following code:

```
<!DOCTYPE html>
<html>
   <head>
      <title>Socket.io Demo</title>
      <meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
   </head>
   <body>
		 <h1>Socket.io Demo</h1>	 
		 <p id="buttonCount">The button has been clicked 0 times.</p>
		 <button onclick="buttonClicked()">Click me</button>
		 <script src="/socket.io/socket.io.js"></script>
		 <script>
			 var socket = io.connect();

			 function buttonClicked(){
			   socket.emit('clicked');
			 }

			 //when we receive buttonUpdate, do this
			 socket.on('buttonUpdate', function(data){
				 document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
			 });
		</script>
   </body>
</html>
```

The server with the following:

```
// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//keep track of how times clients have clicked the button
var clickCount = 0;

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {
	console.log('Client connected...');
	//when the server receives clicked message, do this
    client.on('clicked', function(data) {
    	  clickCount++;
		  //send a message to ALL connected clients
		  io.emit('buttonUpdate', clickCount);
    });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});
```

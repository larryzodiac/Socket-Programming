# Socket-Example

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

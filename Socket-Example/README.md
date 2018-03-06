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

// server.js
const express = require('express');
// Run express
const app = express();
const server = require('http').Server(app);
// Run soclets.io w/ main:server.js
const io = require('socket.io')(server);
const port = 3000;

// Verify if server running
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// When a connection is made
io.on('connection', (socket) => {
    console.log('user connected');
    // Echo user connnected to room
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('message', msg);
    });
    // If a user leaves, echo disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('message', 'user disconnected');
    })
})

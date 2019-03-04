const express = require('express');
var app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080;

// app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
// app.use(express.static('assets'));
// io.on('connection', (socket)=>{
//     socket.on('rotation', (e)=>{
//         console.log(JSON.stringify(e, undefined, 2))
//         io.emit('rotation', e);
//     });
//     console.log('A user has connected');
// })
// http.listen(port, () => console.log(`Example app listening on port ${port}!`))

io.on('connection', function (socket) {
    console.log("connection made");

    socket.on('create or join', function (room) {
        var myRoom = io.sockets.adapter.rooms[room] || {
            length: 0
        };
        var numClients = myRoom.length;

        if (numClients == 0) {
            socket.join(room);
            socket.emit('created', room);
        } else {
            socket.join(room);
            socket.emit("Joined ", room);
        }
    });
    socket.on('ready', function (room) {
        socket.broadcast.to(room).emit("ready");
    });
    socket.on("candidate", function (event) {
        socket.broadcast.to(event.room).emit('candidate', event.sdp);
    });
    socket.on('offer', function (event) {
        socket.broadcast.to(event.room).emit('answer', event.sdp);
    });
    socket.on("answer", function (event) {
        socket.broadcast.to(event.room).emit('answer', event.sdp);
    });
});
http.listen(port, function () {
    console.log("server started");
})
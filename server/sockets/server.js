"use strict";

const 
    server = require('http').createServer(),
    io = require('socket.io')(server);
    
    module.exports = function(port) {
         server.listen(port);
    var sock = io.listen(server);
    console.log("Socket server listening on port "+port);
        
    sock.on('connection', function(socket) {
       socket.on('disconnect', function(){
           console.log('Client disconnected...')
       }); 
    });
    
    return sock;
    }
   
    
    
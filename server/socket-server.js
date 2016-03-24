'use strict';
const
    fs = require('fs'),
    server = require('http').createServer(),
    io = require('socket.io')(server),
    
    filename = process.argv[2];
    
    server.listen(3000);

    var sock = io.listen(server);
        
    sock.on('connection', function(socket) {
       console.log('Client connected...', socket);
       socket.on('disconnect', function(){
           console.log('Client disconnected...')
       }); 
    });
    
    let watcher = fs.watch(filename, function() {
        sock.emit('message', {data:{timestamp:Date.now(), text:"File " + filename +" has changed."}});
    })
    
    
    
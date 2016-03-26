'use strict';
const
    fs = require('fs'),
    server = require('http').createServer(),
    io = require('socket.io')(server),
    api = require('express')(),
    
    filename = process.argv[2];
    
    let id = 0;
    
    server.listen(3000);
    
    api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    api.get('/api/entries', function(req, res) {
        res.send({entries:[{
            verboseMessage: "None",
            shortMessage:"None",
            showing: true,
            timestamp:Date.now(),
            isMarked:false,
            isDimmed:false,
            isVisible:false}]});
    });
    
    api.listen(3001);

    var sock = io.listen(server);
        
    sock.on('connection', function(socket) {
       socket.on('disconnect', function(){
           console.log('Client disconnected...')
       }); 
    });
    
    let watcher = fs.watch(filename, function() {
        let entry = {id:id++, timestamp:Date.now(), text:"File " + filename + " has changed."};
        sock.emit('message', {data:entry});
        console.log('Just sent '+ JSON.stringify(entry));
    })
    
    
    
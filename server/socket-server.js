'use strict';
const
    fs = require('fs'),
    lineReader = require('line-by-line'),
    server = require('http').createServer(),
    io = require('socket.io')(server),
    api = require('express')(),
    filename = process.argv[2],
    lr = new lineReader(filename);
    
    let id = 0;
    let lines = [];
    
    lr.on('line', (line) => {
        lines.push(line);
    });
    
    server.listen(3000);
    
    api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    api.get('/api/entries', function(req, res) {
        let entries = [];
        
        lines.forEach(function(line){
        entries.push(
            {
                id:id++,
                verboseMessage: line,
                shortMessage:line,
                showing: true,
                timestamp:Date.now(),
                isMarked:false,
                isDimmed:false,
                isVisible:false
            });
        });      
        
        res.send({entries:entries});
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
    
    
    
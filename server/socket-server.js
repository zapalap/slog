'use strict';
const
    Promise = require('bluebird'),
    fs = require('fs'),
    lineReader = require('line-by-line-promise'),
    api = require('./http_api/http_api.js')(3001),
    sock = require('./sockets/server.js')(3000),
    filename = process.argv[2];
    
    let id = 0;
    
     api.get('/api/entries', function(req, res) {
        let entries = [],
            lines = [],
            lr = new lineReader(filename);
      
      Promise.coroutine(function* (){
          var line;
          
          while((line = yield lr.readLine()) !== null) {
              console.log(line);
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
          }
           res.send({entries:entries});
      })();
        
       
    });
    
    let watcher = fs.watch(filename, function() {
        let entry = {id:id++, timestamp:Date.now(), text:"File " + filename + " has changed."};
        sock.emit('message', {data:entry});
        console.log('Just sent '+ JSON.stringify(entry));
    })
    
    
    
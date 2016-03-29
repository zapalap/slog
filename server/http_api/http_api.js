"use strict";

const 
    api = require('express')();
    
    module.exports = function(port) {
     api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    api.listen(port);
    console.log('HTTP API listening on port '+port);
    return api;
    };
    
   

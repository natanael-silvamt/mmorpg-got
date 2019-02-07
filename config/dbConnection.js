var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/got";
var dbName = "got";

var conn = function(){
    var client = MongoClient.connect(url, { useNewUrlParser: true });
    return client;
}



/*
var connMongo = function(){  
    var MongoClient = require('mongodb').MongoClient;

    const url = 'mongodb://localhost:27017';
    const dbName = 'got';

    MongoClient.connect(url, function(err, client) {
        if(err) { return console.dir(err); }
        const db = client.db(dbName);
        return db;
    });
    /*  
    var db = new mongo.Db(
        'got', //name database
        new mongo.Server('localhost', 27017, { auto_reconnect: true }), //adress to the server
        {} //configuration file
    );
    return db;
    *
}
*/

module.exports = function () {
    return conn;
}

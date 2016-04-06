var express = require('express');
var app = express();
var path = require('path')
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/bucketlist';

app.use(bodyParser.json() );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/bucketlist', function(req, res){
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('list');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })
})

app.post('/bucketlist', function(req, res){
  // console.log(req.body);
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('list');
    collection.insert({index: req.body.index});
    db.close();
  })
});

app.use(express.static('public'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
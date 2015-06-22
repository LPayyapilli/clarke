var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');

var app = express();

var User = require('./lib/users.js');
var Status = require('./lib/statuses.js');
var Picture = require('./lib/pictures.js');
var Listing = require('./lib/listings.js');

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});

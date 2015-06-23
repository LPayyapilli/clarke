var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var jade = require('jade');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index.js');
var app = express();
var jsonParser = bodyParser.json();

var Account = require('./lib/accounts.js');
// var Listing = require('./lib/listings.js');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(session({
  secret: 'learn node',
  resave: true,
  saveUnititialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport.use(Account.createStrategy());
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());



mongoose.connect('mongodb://localhost/clark_back_end');

app.use('/', routes);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});

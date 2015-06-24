var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var jade = require('jade');
var passport = require('passport');
// var Strategy = require('strategy');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index.js');
var app = express();
var jsonParser = bodyParser.json();
var xmlParser = bodyParser.urlencoded({extended: true});


mongoose.connect('mongodb://localhost/clarke_back_end');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

app.use(session({
  secret: 'we know nothing',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(xmlParser);

var Account = require('./lib/accounts.js');
// var Listing = require('./lib/listings.js');

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());





app.use('/', routes);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});

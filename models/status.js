var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');
var Picture = require('./picture.js');
var Follower = require('./follower.js');
var User = require('./user.js');

var statusSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  _creator: [{ type: String, ref: 'User' }]
});


var Status = mongoose.model('status', statusSchema);


module.exports = Status;

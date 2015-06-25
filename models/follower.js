var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');
var Status = require('./status.js');
var Picture = require('./picture.js');
var User = require('./user.js');


var followerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    data: Buffer,
    type: String
  },
  following: [{ type: Number, ref: 'user'}]
});

var Follower = mongoose.model('follower', followerSchema);

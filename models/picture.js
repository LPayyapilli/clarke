var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');
var Status = require('./status.js');
var Follower = require('./follower.js');
var User = require('./user.js');

var pictureSchema = new mongoose.Schema({
  caption: {
    type: String
  },
  src: {
    data: Buffer,
    type: String
  },
  _creator: {
    type: String,
    ref: 'User'
  },
  likes: {
    type: Number,
    required: true
  },
  postedAt: {
    type: Date,
    required: true
  }
});

var Picture = mongoose.model('picture', pictureSchema);

module.exports = Picture;

var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');




var followerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    data: Buffer,
    content-type: String
  }
});

var pictureSchema = new mongoose.Schema ({
  caption: {
    type: String
  },
  img: { data: Buffer,
    content-type: String
  }
});


var userSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  picture: [pictureSchema],
  follower: [followerSchema]
});

var User = mongoose.model('user', userSchema);

module.exports = User;

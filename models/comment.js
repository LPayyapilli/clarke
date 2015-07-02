var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');

var commentSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  likers: [],
  _creator: {
    type: String,
    ref: 'User'
  },
  _post: {
    type: String
  },
  postedAt: {
    type: Date,
    required: true
  }
});


var Comment = mongoose.model('comment', commentSchema);


module.exports = Comment;

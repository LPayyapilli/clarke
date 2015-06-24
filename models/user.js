var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');




var statusSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  }
});

var followerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    data: Buffer,
    type: String
  }
});

var pictureSchema = new mongoose.Schema({
  caption: {
    type: String
  },
  src: {
    data: Buffer,
    type: String
  }
});

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\S+@\S+\.\S+/
  },
  dob: {
    type: Date,
    required: false
  },
  password: {
    type: String
  },
  status: {
    type: String,
  },
  // userpic: {
  //   type: Array,
  //   required: true
  // },
  status: [statusSchema],
  follower: [followerSchema],
  picture: [pictureSchema]
});



//FIXME: giving following error when
//  user.plugin(passportLocalMongoose);
//  TypeError: undefined is not a function

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);

module.exports = User;

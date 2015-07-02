var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');
var Status = require('./status.js');
var Picture = require('./picture.js');

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
  following: [],
  followedBy: [],
  age: {
    type: String,
  },
  zip: {
    type: String,
  },
  profilePicture: {
    type: String,
    ref: 'Picture'
  },
  backgroundPicture: {
    type: String,
    ref: 'Picture'
  }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);

module.exports = User;

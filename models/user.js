var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');
var Status = require('./status.js');
var Picture = require('./picture.js');
var Follower = require('./follower.js');

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
  statuses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follower' }],
  pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }],
  age: {
    type: String,
  },
  zip: {
    type: String,
  },
  backgroundColor: {
    type: String,
  }
});

//FIXME: giving following error when
//  user.plugin(passportLocalMongoose);
//  TypeError: undefined is not a function

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);

module.exports = User;


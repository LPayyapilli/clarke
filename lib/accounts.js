var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  },
  password: {
    type: String
  }
});

var Account = mongoose.model('account', accountSchema);

Account.plugin(passportLocalMongoose);

module.exports = Account;

var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');

statusSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
  firstName: {
    type: String,
    required: true
  }
});

var Status = mongoose.model('status', statusSchema);

module.exports = Status;



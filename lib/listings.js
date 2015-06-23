var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');

var listingSchema = new mongoose.Schema({
  user: [userSchema],
  img: [pictureSchema],
  status: [statusSchema]
});

var Listing = mongoose.model('listing', listingSchema);

module.exports = Listing;


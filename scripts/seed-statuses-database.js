var async = require('async');
var mongoose = require('mongoose');
var db = require('../db.js');
var User = require('../models/user.js');
var Status = require('../models/status.js');

mongoose.connect(db.url);



async.series([

    function(done) {
      Status.remove({}, done);
    },

    function(done) {
      Status.create({
        input: 'Hey guys! Snowboard meet soon.',
        likes: 1,
        _creator: [{
          ref: 'AWein'
        }]
      }, done);
    },

    function(done) {
      Status.create({
        input: 'soooo tired!',
        likes: 4,
        _creator: [{
          ref: 'Nali'
        }]
      }, done);
    }
  ],

  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);

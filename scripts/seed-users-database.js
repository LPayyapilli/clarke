var async = require('async');
var mongoose = require('mongoose');
var db = require('../db.js');
var User = require('../models/user.js');
var bCrypt = require('bcrypt-nodejs');

mongoose.connect(db.url);

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


async.series([

    function(done) {
      User.remove({}, done);
    },

    function(done) {
      User.create({
        firstName: 'Aaron',
        lastName: 'Weinberg',
        username: 'AWein',
        email: 'aweinberg@gmail.com',
        dob: '4/12/96',
        password: createHash('aaron')
      }, done);
    },

    function(done) {
      User.create({
        firstName: 'Nawal',
        lastName: 'Ali',
        username: 'Nali',
        email: 'nali@gmail.com',
        dob: '02/04/89',
        password: createHash('nawal')
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

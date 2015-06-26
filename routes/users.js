var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var async = require('async');

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

/* GET All Users*/
router.get('/', isAuthenticated, function(req, res) {
  User.find({})
  .select('-password')
  .exec(function(error, userList) {
    res.render('users', {
      users: userList,
      user: req.user
    });
  });
});


/* GET User */
router.get('/:username', isAuthenticated, function(req, res) {
  User.findOne({
    username: req.params.username
  })
  .select('-password')
  .exec(function(error, otherUser) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('user', {
      otherUser: otherUser,
      user: req.user
    });
  });
});


module.exports = router;

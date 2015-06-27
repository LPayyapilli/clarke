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
      res.status(404);
    }
    res.render('user', {
      otherUser: otherUser,
      user: req.user
    });
  });
});


router.post('/follow/:otherUser', isAuthenticated, function(req, res, next) {
  User.findOne({username: req.user.username},function(error, user) {
    user.following.push(req.params.otherUser)
    User.findOneAndUpdate({
      username: req.user.username
    }, {following: user.following}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        User.findOne({username: req.user.username},function(error, otherUser) {
          otherUser.followedBy.push(req.user.username);
          User.findOneAndUpdate({
            username: req.params.otherUser
          }, {followedBy: otherUser.followedBy}, function(err, user) {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/user/' + req.params.otherUser);
            }
          });
        });
      }
    });

  });
});

module.exports = router;

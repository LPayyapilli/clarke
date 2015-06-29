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




/*search for a user*/
router.get('/search', isAuthenticated, function(req, res) {
  User.findOne({
    search: req.body
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

module.exports = router;

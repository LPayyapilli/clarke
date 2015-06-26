var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');
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


/* DELETE user */
  router.delete('/user', isAuthenticated, function(req, res) {
    console.log('hello world');
    console.log(req.user.username);
    User.remove({
        username: req.user.username
      },
      function(error) {
        // if (error) {
        //   console.error(error);
        //   res.redirect('/home');
        // } else {
        //   console.log("redirect");
        //   res.redirect('/');
        // }
      });
  });


/* Delete Status */
router.delete('/status/:statusID', isAuthenticated, function(req, res) {
  console.log("deleting")
  Status.remove({
    _id: req.params.statusID
  })
  .exec(function(error) {
    console.log("DELETE status callback...")
    // if (error) {
    //   console.log(error)
    // }

    // res.redirect('/auth/home');

    // res.render('home',{
    //   user: req.user
    // })





  });
});



module.exports = router

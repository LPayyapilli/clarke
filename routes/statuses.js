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

/* GET ALL USER STATUSES */
router.get('/allStatuses', isAuthenticated, function(req, res) {
  Status.find({
    _creator: req.user.username
  })
  .sort('-postedAt')
  .exec( function(error, statusList) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('statuses', {
      user:req.user,
      statuses: statusList
    });
  });
});

/* GET One USER STATUSES */
router.get('/:statusID', isAuthenticated, function(req, res) {
  Status.findOne({
    _id: req.params.statusID
  }, function(error, status) {
    if (error) {
      console.log(error);
    }
    res.render('status', {
      user: req.user,
      status: status
    });
  });
});



/* Create Status */
router.post('/newStatus', isAuthenticated, function(req, res) {
  console.log(req.user.username);
  User.findOne({
    username: req.user.username
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {

      var newStatus = new Status();

      // set the user's status
      newStatus.input = req.param('input');
      newStatus.likes = 0;
      newStatus.postedAt = new Date();
      newStatus._creator = req.user.username;

      // save the status
      newStatus.save(function(err) {
        if (err) {
          console.log('Error in Saving status: ' + err);
          throw err;
        }
        res.redirect('/auth/home');
      });
    }

  });
});


/* Delete Status */
router.delete('/:statusID', isAuthenticated, function(req, res) {
  Status.remove({
    _id: req.params.statusID
  })
  .exec(function(error) {
    res.redirect('/auth/home');
  });
});


module.exports = router;

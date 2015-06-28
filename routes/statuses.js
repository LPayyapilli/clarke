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


/*GET my listing*/
router.get('/listing', isAuthenticated, function(req, res) {
  console.log("getting listing");
    User.findOne({username: req.user.username},function(error, user){
    if (error) {
      console.log(error)
    } else {
      var array = [];
      var length = 0;
      var followLength = user.following.length;
      for (var i = 0;i<followLength;i++) {
        User.findOne({username: user.following[i]},function(error, follower) {
          if (error) {
            console.log(error);
            followLength = followLength - 1;
          } else {

            Status.find({
              _creator: follower.username
            })
            .sort('-postedAt')
            .exec( function(error, statusList) {
              if (error) {
                console.log(error);
              } else {
                statusList.forEach(function(status) {
                  array.push(status);
                })
                length +=1;
                if(length === followLength){
                  array.sort(function (a, b) {
                    if (a.postedAt > b.postedAt) {
                      return 1;
                    }
                    if (a.postedAt < b.postedAt) {
                      return -1;
                    }
                    return 0;
                  });
                  res.render('statuses', {
                    user:req.user,
                    statuses: array
                  });
                }
              }
            });
          }
        });
      }
    }
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


/* LIKE Status*/
router.post('/like/:statusID', isAuthenticated, function(req, res) {
  Status.findOne({"_id":req.params.statusID}).exec( function(err, status) {
    if (err) {
      console.log(err);
    } else {
      var liked = false;
      for (var i = 0; i < status.likers.length; i++) {
        if (status.likers[i] === req.user.username) {
          liked = true;
        }
      }
      if (liked === false) {
        var newLikes = status.likes + 1;
        status.likers.push(req.user.username);
        Status.findOneAndUpdate({"_id":req.params.statusID}, {likes: newLikes,likers: status.likers}, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/status/' + req.params.statusID);
          }
        });
      } else {
        console.log("already liked");
        res.redirect('/status/' + req.params.statusID);
      }
    }
  });
});

module.exports = router;

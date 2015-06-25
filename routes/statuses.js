var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');

/* GET ALL USER STATUSES */
router.get('/allStatuses', function(req, res) {
  Status.find({_creator: req.user.username}, function(error, statusList) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } res.render('statuses', {
      user: User.find({username: req.user.username}),
      statuses: statusList
    });
  });
});

/* Create Status */
router.post('/newStatus', function(req, res) {
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
      newStatus.likes = 0
      newStatus.postedAt = new Date();
      newStatus._creator = req.user.username;

      // save the status
      newStatus.save(function(err) {
          if (err){
              console.log('Error in Saving status: '+ err);
              throw err;
          }
          console.log('Status succesful');
          res.send(newStatus);
      });
    }
  });
});

module.exports = router;

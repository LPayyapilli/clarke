var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');

/* GET ALL USER STATUSES */
router.get('/allStatuses', function(req, res) {
  Status.find({
    _creator: req.user.username
  }, function(error, statusList) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('statuses', {
      user: User.find({
        username: req.user.username
      }),
      statuses: statusList
    });
  });
});

/* GET One USER STATUSES */
router.get('/:statusID', function(req, res) {
  Status.findOne({
    _id: req.params.statusID
  }, function(error, status){
    if (error) {
      console.log(error);
    }
    res.render('status', {
      user: User.find({username: req.user.username}),
      status: status
    })
  });
})



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
        if (err) {
          console.log('Error in Saving status: ' + err);
          throw err;
        }
        console.log('Status succesful');
        res.send(newStatus);
      });
    }

  });
});


// /* Delete Status */
// router.delete('/home', function(req, res){
//   Status.remove({
//     _id: req.params.id
//   }, function(error){
//     if (error){
//       console.log(error);
//       res.sendStatus(400);
//     }else{
//       res.sendStatus(204);
//     }
//   });
// });
module.exports = router;

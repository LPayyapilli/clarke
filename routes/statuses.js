var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');

/* GET ALL USER STATUSES */
router.get('/:username/statuses', function(req, res) {
  console.log(req.params.username);
  User.findOne({
    username: req.params.username
  }, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('user', {
      statuses: statuses
    });
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
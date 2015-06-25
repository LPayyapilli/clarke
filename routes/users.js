var express = require('express');
var router = express.Router();
var User = require('../models/user.js');



// SHOW ALL USERS
// GET
router.get('/', function(req, res) {
  User.find({}, function(error, userList) {
    res.render('users', {
      users: userList
    });
  })
});

//SHOW A SPECIFIC USER?
//GET
router.get('/:username', function(req, res) {
  console.log(req.params.username);
  User.findOne({
    username: req.params.username
  }, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('user', {
      user: user
    });
  });
});



// //UPDATE A SPECIFIC USER?
// //PUT
// router.put('/users/:id', jsonParser);
// router.put('/users/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, function(error, user) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// //UPDATE A SPECIFIC USER?
// //PATCH
// router.patch('/users.:id', jsonParser);
// router.patch('/users/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, function(error, user) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(400);
//     }
//     console.log("PATCH User, ", user);
//     res.sendStatus(200);
//   });
// });


/* DELETE user */
router.delete('/delete', function(req, res) {
  console.log('hello world');
  console.log(req.user.username);
  User.remove({
      username: req.user.username
    },
    function(error) {
      if (error) {
        console.error(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
});

module.exports = router;

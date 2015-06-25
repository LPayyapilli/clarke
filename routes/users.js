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



/* GET Patch User Page */
router.get('/patch', function(req, res) {
  res.render('patchUser', {
    message: req.flash('message')
  });
});

/* PATCH user */
router.post('/patch', function(req, res) {
  console.log(req.body);
  User.findOneAndUpdate({
    username: req.user.username
  }, req.body, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('patchUser', {});
    }
  });
});


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

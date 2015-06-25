var express = require('express');
var router = express.Router();
var User = require('../models/user.js');



/* GET All Users*/
router.get('/', function(req, res) {
  User.find({}, function(error, userList) {
    res.render('users', {
      users: userList
    });
  })
});


/* GET User */
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


module.exports = router;

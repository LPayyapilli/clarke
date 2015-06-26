var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var async = require('async');


  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', {
      message: req.flash('message')
    });
  });


module.exports = router;

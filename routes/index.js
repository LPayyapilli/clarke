var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var async = require('async');


router.get('/', function(req, res) {
  // Display the Login page with any flash message, if any
  console.log(req);
  res.render('index', {
    message: req.flash('message')
  });
});

/* GET About Page */
router.get('/about', function(req, res) {
  res.render('about');
});

/* GET Contact Page */
router.get('/contact', function(req, res) {
  res.render('contact');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport) {

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', {
      message: req.flash('message')
    });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res) {
    res.render('register', {
      message: req.flash('message')
    });
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  /* GET Profile Page */
  router.get('/home', isAuthenticated, function(req, res) {
    res.render('home', {
      user: req.user
    });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  /* GET Patch User Page */
  router.get('/patch/user', function(req, res) {
    res.render('patchUser', {
      message: req.flash('message')
    });
  });

  /* PATCH user */
  router.post('/patch/user', function(req, res) {
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
  router.delete('/delete/user', function(req, res) {
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

  return router;
}

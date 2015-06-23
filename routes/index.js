var express = require('express');
var passport = require('passport');
var Account = require('../lib/accounts.js');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index', { title: "RiddleBook", user : req.user, views: req.session});
});

router.get('/register', function(req, res, next) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ email : req.body.email }), req.body.password, function(err, account) {
        if (err) {
            //FIXME: add validations and uniqueness
            return res.render('register', { account : account });
        }
        console.log("we registered");
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.redirect('/');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res, next){
    res.status(200).send("done!");
});

module.exports = router;

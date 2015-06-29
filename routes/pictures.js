var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');
var Picture = require('../models/picture.js');
var async = require('async');
var fs = require('fs');
var multer = require('multer');
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
require('dotenv').load();


var aws_access_key =  process.env.AWS_ACCESS_KEY_ID;
var aws_secret_key = process.env.AWS_SECRET_KEY_ID;


var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

/* GET ALL USER Pictures */
router.get('/allPictures', isAuthenticated, function(req, res) {
  Picture.find({
    _creator: req.user.username
  })
  .sort('-postedAt')
  .exec( function(error, pictures) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    res.render('pictures', {
      user:req.user,
      pictures: req.user.pictures
    });
  });
});

// /* GET One USER PICTURES */
//  router.get('/:src', isAuthenticated, function(req, res) {
//    Picture.findOne({
//        src: req.picture.params.src
//    }, function(error, picture) {
//     if (error) {
//       console.log(error);
//      }
//      res.render('picture', {
//        user: req.user,
//        picture.src: req.picture.params.src;
//      })
//    });
// });


AWS.config.update({
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_key
});

var s3 = new AWS.S3();

router.use(bodyParser({uploadDir:'./uploads'}));

router.use(multer({
  dest: './uploads',
  limits : { fileSize:100000 },
  rename: function (pictures, src) {
    return src.replace(/\W+/g, '-').toLowerCase();
  },
  onFileUploadData: function (file, data, req, res) {
    // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
    var params = {
      Bucket: 'clarkedbteer',
      Key: file.name,
      Body: data
    };

    s3.putObject(params, function (perr, pres) {
      if (perr) {
        console.log("Error uploading data: ", perr);
      } else {
        console.log("Successfully uploaded data to clarkedbteer");
      }
    });
  }
}));

router.post('/upload', function(req, res) {
  if(req.files !== undefined) {
    User.findOne({
      username: req.user.username
    },    function(error) {
            if (error) {
              console.log(error);
              res.sendStatus(404);
            } else {

      var newPicture = new Picture();

      // set the user's picture
      newPicture.src = req.files.thumbnail.name;
      newPicture.caption = req.param('caption');
      newPicture.likes = 0;
      newPicture.postedAt = new Date();
      newPicture._creator = req.user.username;
      console.log(newPicture);
      // save the picture
      newPicture.save(function(err) {
        if (err) {
          console.log('Error in Saving status: ' + err);
          throw err;
        }
        console.log('picture saved!');
        res.redirect('/auth/home');
        });
      }
    });
  } else {
        res.send("error, no file chosen");
  }
});


module.exports = router;

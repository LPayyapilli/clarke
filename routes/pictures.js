var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Status = require('../models/status.js');
var async = require('async');
var fs = require('fs');
var multer = require('multer');
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');

var aws_access_key =  process.env.AWS_ACCESS_KEY;
var aws_secret_key = process.env.AWS_SECRET_KEY;



var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

// /* GET ALL USER Pictures */
// router.get('/allPictures', isAuthenticated, function(req, res) {
//   Picture.find({
//     _creator: req.user.username
//   })
//   .sort('-postedAt')
//   .exec( function(error, pictureList) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(404);
//     }
//     res.render('pictures', {
//       user:req.user,
//       pictures: picturesList
//     });
//   });
// });

// /* GET One USER PICTURES */
//  router.get('/:pictureID', isAuthenticated, function(req, res) {
//    Picture.findOne({
//        _id: req.params.pictureID
//    }, function(error, picture) {
//     if (error) {
//       console.log(error);
//      }
//      res.render('picture', {
//        user: req.user,
//        picture: picture
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

/* Create Picture for User */
router.post('/upload', function(req, res, next) {
  console.log(req.body);
    if(req.files.image !== undefined){
        console.log("successful upload");
        next();
    } else {
        res.send("error, no file chosen");
    }
});

// router.post('/allPictures', function(req, res) {
//   User.findOne({
//     username: req.user.username
//   }, function(error) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(404);
//     } else {

//       var newPicture = new Picture();

//       // set the user's picture
//       newPicture = req.param('caption');
//       newStatus.likes = 0;
//       newStatus.postedAt = new Date();
//       newStatus._creator = req.user.username;

//       // save the picture
//       newPicture.save(function(err) {
//         if (err) {
//           console.log('Error in Saving status: ' + err);
//           throw err;
//         }
//         res.redirect('/auth/home');
//       });
//     }
//   });
// });


module.exports = router;

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var User = require('./models/user.js');

// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// SHOW ALL USERS
// GET
// app.get('/users', function(req, res) {
//   User.find({}, function(error, userList) {
//     res.render('users', {
//       users: userList
//     });
//   })
// });

//SHOW A SPECIFIC USER?
//GET
app.get('/user/:username', function(req, res) {
  console.log(req.params.username);
  User.findOne({
    username: req.params.username
  }, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    }
    // console.log(user[0]);
    // res.send(user[0]);
    // console.log(user[0].username);
    res.render('user', {
      user: user
    });
  });
});

// //CREATE A USER?
// //POST
// app.post('/users', jsonParser);
// app.post('/users', function(req, res) {
//   User.create(req.body, function(error, user) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       fs.readFile('./views/user.jade', 'utf8', function(err, data) {
//         if (err) {
//           res.sendStatus(400);
//         };
//         var userCompiler = jade.compile(data);
//         var html = userCompiler(user);
//         res.json(html);
//         res.status(201);
//       });
//     };
//   });
// });


// //UPDATE A SPECIFIC USER?
// //PUT
// app.put('/users/:id', jsonParser);
// app.put('/users/:id', function(req, res) {
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
// app.patch('/users.:id', jsonParser);
// app.patch('/users/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, function(error, user) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(400);
//     }
//     console.log("PATCH User, ", user);
//     res.sendStatus(200);
//   });
// });

// //DELETE A SPECIFIC USER?
// //DELETE
// app.delete('/users/:id', function(req, res) {
//   User.remove({
//     _id: req.params.id
//   }, function(error) {
//     if (error) {
//       console.error(error);
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(204);
//     }
//   });
// });





app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
  secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}






module.exports = app;

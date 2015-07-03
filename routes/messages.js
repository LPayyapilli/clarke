var express = require('express');
var router = express.Router();
var Conversation = require('../models/conversation.js');

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

/* Post picture Message */
router.post('/newConversation', isAuthenticated, function(req, res) {
  console.log(req.body);
  var newConversation = new Conversation();
  newConversation.title = req.param('title');
  newConversation.postedAt = new Date();
  newConversation._creator = req.user.username;
  newConversation.recipients = [req.user.username, req.body.recipients];
  newConversation.messages.push({
    _creator: req.user.username,
    postedAt: new Date(),
    input: req.param('input')
  });
  newConversation.save(function(err) {
    if (err) {
      console.log('Error in Saving message: ' + err);
      res.end();
      throw err;
    } else {
        res.redirect('/auth/home');
      }
   });
});

/* Post picture Message */
router.post('/:convoID/newMessage', isAuthenticated, function(req, res) {
  console.log(req.body);
  Conversation.findOne({
    _id: req.params.convoID
  }, function(error,Convo) {
    if (error) {
      console.log(error);
      res.status(404);
      res.end()
    } else {
      Convo.messages.push({
        _creator: req.user.username,
        postedAt: new Date(),
        input: req.param('input')
      });
      Convo.save(function(err) {
        if (err) {
          console.log('Error in Saving message: ' + err);
          res.end();
          throw err;
        } else {
          console.log(Convo);
          res.redirect('/conversation/' + Convo._id);
        }
      });
    }
  })
});

router.get('/all',isAuthenticated,function(req,res) {
  Conversation.find({
    _creator: req.user.username
  }, function(error,convos) {
    if (error) {
      console.log(error);
      res.status(404);
      res.end()
    } else {
      res.render('conversations',{
        user: req.user,
        convos: convos
      })
    }
  });
})

router.get('/:convoID',isAuthenticated,function(req,res) {
  Conversation.findOne({
    _id: req.params.convoID
  }, function(error,convo) {
    if (error) {
      console.log(error);
      res.status(404);
      res.end()
    } else {
      res.render('conversation',{
        user: req.user,
        convo: convo
      })
    }
  });
})


module.exports = router;

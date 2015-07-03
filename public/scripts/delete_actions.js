$(document).ready(function() {

  var urlBase = 'https://clarkesocial.herokuapp.com';
  // var urlBase = 'http://localhost:3000';

  $('.delete_comment').on('click', function(event) {
    var commentID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/comment/' + commentID
    })
      .done(function(response) {
        window.location.reload();
    });
  });

  $('#delete_convo').on('click', function(event) {
    var convoID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/convo/' + convoID
    })
      .done(function(response) {
        window.location.pathname = '/conversation/all';
    });
  });

  $('#delete_picture_button').on('click',function(event) {
    var pictureID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/picture/' + pictureID
    })
      .done(function(response) {
        window.location.pathname = '/auth/home';
    });
  });

  $('#delete_status').on('click', function(event) {
    var statusID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/status/' + statusID
    })
      .done(function(response) {
        window.location.pathname = '/auth/home';
    });
  });
   $('.delete_comment').on('click', function(event) {
    var commentID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/comment/' + commentID
    })
      .done(function(response) {
        window.location.pathname = '/auth/home';
    });
  });

});

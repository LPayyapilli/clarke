$(document).ready(function() {
  // var urlBase = 'https://clarkesocial.herokuapp.com';
  var urlBase = 'http://localhost:3000';
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
});

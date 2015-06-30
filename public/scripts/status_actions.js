$(document).ready(function() {
  var urlBase = 'https://clarkesocial.herokuapp.com';
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
});

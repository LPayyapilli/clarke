$(document).ready(function() {

  // var urlBase = 'https://clarkesocial.herokuapp.com';
  var urlBase = 'http://localhost:3000';

  $('#delete_user').on('click', function(event) {
    $.ajax({
      method: 'DELETE',
      url: urlBase + '/delete/user'
    })
      .done(function(response) {
        window.location.pathname = '/';
      });
  });
  $('#patch_user').on('click', function(event) {
    $.ajax({
      method: 'PATCH',
      url: urlBase + '/patch/user'
    })
      .done(function(response) {
        // document.location.href="/";
      });
  });
});

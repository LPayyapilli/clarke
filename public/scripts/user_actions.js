$(document).ready(function() {
  var username = req.session;
  $('#delete_user').on('click', function(event) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/delete_user/' + username
    })
      .done(function(response) {
        response.session.destroy(function(error) {
          if (error) {
            console.log(error);
          } else {
            session.destroy;
          }
        });
      })
  });
});

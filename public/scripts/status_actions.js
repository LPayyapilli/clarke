$(document).ready(function() {
  $('#delete_status').on('click', function(event) {
    var statusID = event.target.title;
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/delete/status/' + statusID
    })
      .done(function(response) {

      });
  });
});

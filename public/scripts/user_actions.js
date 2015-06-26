$(document).ready(function() {
  $('#delete_user').on('click', function(event) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/delete/user'
    })
      .done(function(response) {
        window.location.pathname = '/';
      });
  });
  $('#patch_user').on('click', function(event) {
    $.ajax({
      method: 'PATCH',
      url: 'http://localhost:3000/patch/user'
    })
      .done(function(response) {
        // document.location.href="/";
      });
  });
  $('#backgroundColorField').keyup(function(event) {
    console.log($('#backgroundColorField').val());
    if ($('#backgroundColorField').val().length > 2) {
      console.log("color change");
      $('.signup-wall').css('background-color',''+ $('#backgroundColorField').val());
    };
  });

});

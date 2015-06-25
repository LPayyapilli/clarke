$(document).ready(function() {
  $('#delete_user').on('click', function(event) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/user/delete'
    })
      .done(function(response) {
        // document.location.href="/";
      });
  });
  $('#patch_user').on('click', function(event) {
    $.ajax({
      method: 'PATCH',
      url: 'http://localhost:3000/user/patch'
    })
      .done(function(response) {
        // document.location.href="/";
      });
  });
  $('#backgroundColorField').keyup(function(event) {
    console.log($('#backgroundColorField').val());
    if ($('#backgroundColorField').val().length > 3) {
      console.log("color change");
      $('body').css('background-color',''+ $('#backgroundColorField').val());
    };
  });

});

$(document).ready(function() {
  // $('body').on('click', function(event) {
  //   if (event.target.id === 'delete_user') {
  //     var username = $('.username').val();
  //     console.log(username);
  //     $.ajax({
  //       method: 'DELETE',
  //       url: 'http://localhost:3000/delete/user/' + username
  //     })
  //       .done(function(response) {
  //         response.session.destroy(function(error) {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             session.destroy;
  //           }
  //         });
  //       });
  //   }
  // });
  $('#delete_user').on('click', function(event) {
    // var username = $('#username').val();
    // // var username = event.target.class;
    // console.log('test');
    // console.log(username);
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/delete/user'
    })
      .done(function(response) {
        response.session.destroy(function(error) {
          if (error) {
            console.log(error);
          } else {
            session.destroy();
          }
        });
      });
  });
});

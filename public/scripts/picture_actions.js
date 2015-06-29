$(document).ready(function() {
  // $('#delete_picture').on('click', function(event) {
  //   var statusID = event.target.title;
  //   $.ajax({
  //     method: 'DELETE',
  //     url: 'http://localhost:3000/delete/status/' + statusID
  //   })
  //     .done(function(response) {
  //       window.location.pathname = '/auth/home';
  //   });
  // });
  $('.pictureLink').on('click',function(event) {
    $.ajax({
      url: 'http://localhost:3000' +event.target.title,
      type: 'GET'
    })
    .done(function(data) {
      console.log(data.src);





    })
    .fail(function() {
      console.log("error");
    })
  });

});

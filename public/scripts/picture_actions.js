$(document).ready(function() {
  var urlBase = 'https://clarkesocial.herokuapp.com';
  // var urlBase = 'http://localhost:3000';

  $('#pictureContainer').on('click',function(event) {
    if (event.target.id === 'delete_picture_button') {
      var pictureID = event.target.title;
      $.ajax({
        method: 'DELETE',
        url: urlBase + '/delete/picture/' + pictureID
      })
        .done(function(response) {
          window.location.pathname = '/auth/home';
      });
    }
  });

  $.ajax({
    url: urlBase + '/user/profilePicture',
    type: 'GET'
  })
  .done(function(picture) {
    var link = 'https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src;
    // $('#profilePicture').html('<img class="bigImage" id=image'+ picture._id+);
    $('#about-me-blurb').css('background-image','url(' + link + ')');
  })
  .fail(function() {
    console.log("error");
  });

});


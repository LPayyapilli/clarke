$(document).ready(function() {
  // var urlBase = 'https://clarkesocial.herokuapp.com';
  var urlBase = 'http://localhost:3000';
  $('.pictureLink').on('click',function(event) {
    $.ajax({
      url: urlBase + event.target.title,
      type: 'GET'
    })
    .done(function(picture) {
      var link = 'https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src;
      // $('#pictureContainer').html('

// <img class="bigImage" id="image'+ picture._id+' src="' + link + '"/>
// <div class="delete_picturee">
//   <a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info">
//     Make Profile Picture
//   <a/>
// </div>
// <div id="captionContainer">
//   Caption: ' + picture.caption + '
// </div>
// <div id="likesContainer">
//   Likes: ' + picture.likes + '
// </div>
// <div class="delete_picture">
//   <a id="delete_picture" title="' + picture._id + '">
//     Delete Picture
//   </a>
// </div>
// <div class="delete_picture">
//   <form class="form-signin" action="/picture/'+ picture._id +'/newComment" method="POST">
//     <input type="text" name="input" class="form-control" placeholder="New Comment" required autofocus></input>
//     <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
//   </form>
// <div>

//       ');



    })
    .fail(function() {
      console.log("error");
    })
  });


  $('#pictureContainer').on('click',function(event) {
    if (event.target.id.substring(0, 5) === 'image') {
      var imageID = event.target.id.substring(5);
      $.ajax({
        url: urlBase + '/picture/like/' + imageID,
        type: 'POST'
      })
      .done(function(picture) {
        $.ajax({
          url: urlBase + '/picture/' + imageID,
          type: 'GET'
        })
        .done(function(picture) {
          var link = 'https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src;

          // SAVE AS ABOVE ONCE ABOVE IS FINISHED

        })
        .fail(function() {
          console.log("error");
        })
      })
      .fail(function() {
        console.log("error");
      })
    }
    else if (event.target.id === 'delete_picture') {
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


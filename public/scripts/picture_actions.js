$(document).ready(function() {
  // var urlBase = 'https://clarkesocial.herokuapp.com';
  var urlBase = 'http://localhost:3000';

  $('.pictureLink').on('click',function(event) {
    $.ajax({
      url: urlBase + event.target.title,
      type: 'GET'
    })
    .done(function(data) {
      var picture = data.picture;
      var comments = data.comments;
      $('#pictureContainer').html('<img class="bigImage" id="image'+ picture._id+'" src="https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src + '"/><div class="picture_info"><a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info">Make Profile Picture<a/></div><div id="captionContainer">Caption: ' + picture.caption + '</div><div id="likesContainer">Likes: ' + picture.likes + '</div><div class="picture_info"><a id="picture_info" title="' + picture._id + '">Delete Picture</a></div><div class="picture_info"><form class="form-signin commentButtonContainer" action="/picture/'+ picture._id +'/newComment" method="POST"><input type="text" name="input" class="form-control" placeholder="New Comment" required autofocus></input><button class="btn btn-lg btn-primary btn-block" type="submit">Submit Comment</button></form><div><div class="commentsContainer"></div>');
      if (comments.lenght > 0) {
        $('.commentsContainer').html('');
        for (comment in comments) {
          console.log(comment);
          // $('.commentsContainer').append()
        }
      }
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
          var picture = data.picture;
          var comments = data.comments;
          $('#pictureContainer').html('<img class="bigImage" id="image'+ picture._id+'" src="https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src + '"/><div class="picture_info"><a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info">Make Profile Picture<a/></div><div id="captionContainer">Caption: ' + picture.caption + '</div><div id="likesContainer">Likes: ' + picture.likes + '</div><div class="picture_info"><a id="picture_info" title="' + picture._id + '">Delete Picture</a></div><div class="picture_info"><form class="form-signin commentButtonContainer" action="/picture/'+ picture._id +'/newComment" method="POST"><input type="text" name="input" class="form-control" placeholder="New Comment" required autofocus></input><button class="btn btn-lg btn-primary btn-block" type="submit">Submit Comment</button></form><div><div class="commentsContainer"></div>');
          if (comments.lenght > 0) {
            $('.commentsContainer').html('');
            for (comment in comments) {
              console.log(comment);
              // $('.commentsContainer').append()
            }
          }
        })
        .fail(function() {
          console.log("error");
        })
      })
      .fail(function() {
        console.log("error");
      })
    }
    else if (event.target.id === 'picture_info') {
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


$(document).ready(function() {
  $('.pictureLink').on('click',function(event) {
    $.ajax({
      url: 'http://localhost:3000' + event.target.title,
      type: 'GET'
    })
    .done(function(picture) {
      var link = 'https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src;
      $('#pictureContainer').html('<img class="bigImage" id=image'+ picture._id+' src="' + link + '"/><a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info"> Make Profile Picture <a/><div id="captionContainer">Caption: ' + picture.caption + '</div><div id="likesContainer">Likes: ' + picture.likes + '</div>');
    })
    .fail(function() {
      console.log("error");
    })
  });

  $('#pictureContainer').on('click',function(event) {
    if (event.target.id.substring(0, 5) === 'image') {
      var imageID = event.target.id.substring(5);
      $.ajax({
        url: 'http://localhost:3000/picture/like/' + imageID,
        type: 'POST'
      })
      .done(function(picture) {
        $.ajax({
          url: 'http://localhost:3000/picture/' + imageID,
          type: 'GET'
        })
        .done(function(picture) {
          var link = 'https://s3-us-west-2.amazonaws.com/clarkedbteer/' + picture.src;
          $('#pictureContainer').html('<img class="bigImage" id=image'+ picture._id+' src="' + link + '"/><a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info"> Make Profile Picture <a/><div id="captionContainer">Caption: ' + picture.caption + '</div><div id="likesContainer">Likes: ' + picture.likes + '</div>');
        })
        .fail(function() {
          console.log("error");
        })
      })
      .fail(function() {
        console.log("error");
      })
    }
  });

  $.ajax({
    url: 'http://localhost:3000/user/profilePicture',
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


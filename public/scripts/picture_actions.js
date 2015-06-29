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


  $('.pictureLink').on('click', function(event) {
    $.ajax({
      url: 'http://localhost:3000' + event.target.title,
      type: 'GET'
    })
      .done(function(picture) {
        console.log(picture.src);
        //make get req to aws s3 on the data.src
        var params = {
          Bucket: 'clarkedbteer',
          Key: picture.src
        };

        s3.getObject(params, function(error, data) {
          if (error) {
            console.log(error);
          } else {
            $('#pictureContainer').append(data.body);
          }
        })

      })
      .fail(function() {
        console.log("error");
      })
  });

});

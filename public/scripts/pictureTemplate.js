<img class="bigImage" id="image'+ picture._id+'" src="' + link + '"/>
<div class="delete_picture">
  <a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info">
    Make Profile Picture
  <a/>
</div>
<div id="captionContainer">
  Caption: ' + picture.caption + '
</div>
<div id="likesContainer">
  Likes: ' + picture.likes + '
</div>
<div class="delete_picture">
  <a id="delete_picture" title="' + picture._id + '">
    Delete Picture
  </a>
</div>
<div class="delete_picture">
  <form class="form-signin" action="/picture/'+ picture._id +'/newComment" method="POST">
    <input type="text" name="input" class="form-control" placeholder="New Comment" required autofocus></input>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
  </form>
<div>

'<img class="bigImage" id="image'+ picture._id+'" src="' + link + '"/><div class="delete_picture"><a href="/user/makeProfilePicture/' + picture._id +'" class="picture_info">Make Profile Picture<a/></div><div id="captionContainer">Caption: ' + picture.caption + '</div><div id="likesContainer">Likes: ' + picture.likes + '</div><div class="delete_picture"><a id="delete_picture" title="' + picture._id + '">Delete Picture</a></div><div class="delete_picture"><form class="form-signin" action="/picture/'+ picture._id +'/newComment" method="POST"><input type="text" name="input" class="form-control" placeholder="New Comment" required autofocus></input><button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button></form><div>'


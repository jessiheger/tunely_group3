/* CLIENT-SIDE JS
 *
 * You will need this file for doing PUT or DELETE requests.
 * As an example, here is how one might implement a delete button
 * 1. Create a big red button that says delete. Give it an id.
 * 2. Listen for the click event on the button (using the id you made for it).
 * 3. In the function that executes on that click event, make an AJAX request to the server to
 *    delete the album. (Note: you will need the album id as part of the url)
 * 4. Make the route on the server side that accepts this request. Make sure it is getting there.
 * 5. Perform the deletion in the database
 *
 */

var $albumList;
var allAlbums = [];

$(document).ready(function() {
  console.log('app.js loaded!');

$albumList = $('#albumDiv');


// get all albums  
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

// Submit a new album
    $('#newAlbum').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
          method: 'POST',
          url: '/api/albums',
          data: $(this).serialize(),
          success: newAlbumSuccess,
          error: newAlbumError
        });
     });
});

function getAlbumHtml(album) {
  return `<!-- one album -->
          <div class="row album">
            <div class="col-md-10 col-md-offset-1">
              <div class="panel panel-default">
                <div class="panel-body">
                <!-- begin album internal row -->
                  <div class='row'>
                    <div class="col-md-3 col-xs-12 thumbnail album-art">
                      <img src="http://placehold.it/800x800" alt="album image">
                    </div>
                    <div class="col-md-9 col-xs-12">
                      <ul class="list-group">
                        <li class="list-group-item">
                          <h4 class='inline-header'>Album Name:</h4>
                          <span class='album-name'>${album.name}</span>
                        </li>
                        <li class="list-group-item">
                          <h4 class='inline-header'>Artist Name:</h4>
                          <span class='artist-name'>${album.artistName}</span>
                        </li>
                        <li class="list-group-item">
                          <h4 class='inline-header'>Released date:</h4>
                          <span class='album-releaseDate'>${album.releaseDate}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- end of album internal row -->
                  <div class='panel-footer'>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end one album -->`;
};

function getAllAlbumsHtml(albums) {
	// console.log(albums);
  return albums.map(getAlbumHtml).join("");
 // console.log(albums.map(getAlbumHtml).join(""));
}

function render () {
  // empty existing posts from view
  $albumList.empty();
  // pass `allAlbums` into the template function
  var albumHtml = getAllAlbumsHtml(allAlbums);
  // append html to the view
  $albumList.append(albumHtml);
};

function handleSuccess(json) {
	// console.log("successsssss");
	// console.log(json);
	allAlbums = json;
  	render();
}

function newAlbumSuccess(json) {
    $('#newAlbum input').val('');
  	allAlbums.push(json);
  	render();
}

function newAlbumError(){
    console.log("POST error");
};

function handleError(e) {
  console.log('uh oh');
}








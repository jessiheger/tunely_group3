// SERVER-SIDE JAVASCRIPT

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var db          = require('./models');

// set EJS as our view engine. This allows us to make dynamic pages.
app.set('view engine', 'ejs');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

/*
HARD-CODED DATA
What we've done here is mocked up what a database object would hypothetically look like
if we had one. That's why we've included an idea. We're trying to simulate the data so that
when we do hook up the database later, it's a seamless transition.

First get your routes hooked up and the ejS looking the way you want. When you are
ready to proceed with hooking up the database, go to ./models/album to create a schema.
Then, take a look into the seed.js file to populate some starter data.
*/


/**********
 * ROUTES *
 **********/


app.get('/', function homepage (req, res) {
  db.Album.find(function (err, albums) {
    if (err){
      console.log("****************ERROR*******************", err);
    } else {
    res.render('index', { albums: albums });
    }
  })
});

app.get('/albums/:id', function homepage (req, res) {
  db.Album.findById(req.params.id, function (err, album) {
    if (err){
      console.log("****************ERROR*******************", err);
    } else {
    res.json(album);
    }
  })
});

app.get('/api/albums', function (req, res) {
  db.Album.find(function (err, albums) {
    if (err){
      console.log("****************ERROR*******************", err);
    } else {
    res.json(albums);
    }
  })
});

app.get('/api/albums/:id', function (req, res) {
  db.Album.find(function (err, albums) {
    if (err){
      console.log("****************ERROR*******************", err);
    } else {
    res.json(albums[req.params.id-1]);
    }
  })
});

app.post('/api/albums', function (req, res) {
  // let genres = req.body.genres.replace(/,\s|\sand\s/g, " ").split(" ")
  let genres = req.body.genres;
  console.log(req.body);
 let newAlbum = db.Album({
    artistName: req.body.artistName, 
    name: req.body.name, 
    releaseDate: req.body.releaseDate, 
    genres: genres});
  newAlbum.save();
   res.json(newAlbum);
});



// TODO: GET ROUTE for single album (Route has an id in the url. e.g., /:id that can be accessed
// on the request object with req.params.id).

// TODO: POST ROUTE (NOTE: You can submit a post request directly from an HTML form tag
// using the method and action attributes - no need for AJAX!)


/*
 * JSON API Endpoints: This usually means AJAX has been used to call this route
 */

// TODO: DELETE ROUTE (removes/destroys an album in the DB. Needs to be called from AJAX.)

// TODO: PUT ROUTE (edits/updates the info in the DB. Needs to be called from AJAX.)

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Listening...');
});

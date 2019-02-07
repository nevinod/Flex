let express = require('express');
let request = require('request');
let querystring = require('querystring');
let favicon = require('serve-favicon');
const path = require('path');

let app = express()

// favicon
app.use(favicon(__dirname + '/images/iconfinder_spotify_287525.svg'))

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/callback' ||
  'https://spotifysongselector.herokuapp.com/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/callback', function(req, res) {
  // console.log(req);
  console.log(`'Authorization': 'Basic ' + ${(new Buffer(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64'))}`);
  let code = req.query.code || null
  // console.log(`CODEEEEEE --- ${code}`);
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    console.log(`/callback ${body.refresh_token}`);
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/demolog', function(req, res) {
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: 'AQC6AbYvryFuCoy_We77vkDF209UWHqnn9qbtwWvIv8Dz47f0cDeEPiI4oWU87dOy3uLaNpXZrm3TL6gdE75PnEPbs8DgJEUsjeFwiHcP1Kk2sO9Z8XBNY1c6CNK1FljQDlhyg'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    console.log(`/demolog ${body}`);
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + body.access_token);
  })
})
let port = process.env.PORT || 8888

console.log(`dir name ${__dirname}`);
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)

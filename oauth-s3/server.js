let express = require('express')
let request = require('request')
let querystring = require('querystring')
const path = require('path');

let app = express()

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
  let code = req.query.code || null
  console.log(`CODEEEEEE --- ${code}`);
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
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/demolog', function(req, res) {
  res.redirect(uri + '?access_token=BQCrLlCo3qH20XkHv5FsesVj3g1UG49FeVSw5hXJW_lwZJ6GgP27mLWN8VSCjVMt8KauoMv0Iqimo5ElIHza0DyxcKf4A90-EaSpdmGgqzFc7sZBTRujN9H35eR-r2BoQiTbt3DWra_H1x59qduB7rrEjyA9jYDs6TM7eQ')
})

let port = process.env.PORT || 8888

console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)

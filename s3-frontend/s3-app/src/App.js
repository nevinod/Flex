import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'
import PlaylistIndex from './playlistIndex'
// import merge from 'lodash/merge';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      playlists: {},
      songs: {},
      albums: [],
      recommended: {},
      loggedIn: false,
      sorted: []
    }
    // this.getAlbumsFromSongs = this.getAlbumsFromSongs.bind(this)
    this.getPlaylistSongs = this.getPlaylistSongs.bind(this)
    this.recommendation = this.recommendation.bind(this)
    this.getAlbumsFromSongs = this.getAlbumsFromSongs.bind(this)
  }

  componentWillMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    // let that = this
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => this.setState({playlists: data }))
      // .then(() => that.getPlaylistSongs())
      // .then(() => that.getAlbumsFromSongs())
      // .then(() => that.recommendation())
  }

  async getPlaylistSongs() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    if(this.state.playlists.items) {
      for(let i = 0; i < this.state.playlists.items.length; i++) {
        await fetch(`https://api.spotify.com/v1/users/${this.state.playlists.items[i].owner.id}/playlists/${this.state.playlists.items[i].id}/tracks`, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => response.json())
          .then(data => this.setState({songs: data}))
      }
    }
  }

  async recommendation() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    let notUnique = true
    let tempSorted = this.state.songs.items.sort(function(a,b) {
      return b.track.popularity - a.track.popularity
    })
    this.setState({sorted: tempSorted})
    if(this.state.songs.items && notUnique) {
      let templen = this.state.sorted.length
      await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${this.state.sorted[0].track.id},${this.state.sorted[1].track.id},${this.state.sorted[2].track.id},${this.state.sorted[templen - 2].track.id},${this.state.sorted[templen - 1].track.id}&limit=10`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(response => response.json())
        .then(data => this.setState({recommended: data}))
    }

  }

  // fetchNow(trackID) {
  //   let found = false
  //   let parsed = queryString.parse(window.location.search)
  //   let accessToken = parsed.access_token
  //   fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
  //     headers: { 'Authorization': 'Bearer ' + accessToken }
  //   }).then(response => response.json())
  //     .then(data => return data)
  // }



  async getAlbumsFromSongs() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    // console.log("IN ALBUMS");
    console.log(this.state.songs);
    if(this.state.songs.items) {
      // console.log("IN IF");
      for(let i = 0; i < this.state.songs.items.length; i++) {
        await fetch(`https://api.spotify.com/v1/albums/${this.state.songs.items[i].track.album.id}`, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => response.json())
          .then(data => {
            let temp = this.state.albums
            temp.push(data)
            this.setState({albums: temp}) })
      }
    }
  }

  render() {
    // this.fetchNow("3n3Ppam7vgaVa1iaRUc9Lp")
    if (this.state.playlists.items) {
      console.log(this.state);
      return (
        <div>
          <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet"></link>
          </head>
          <div id="navbar">
            <div id="logo-container">
              <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify"/>
              <span id="title">
                S 3
              </span>
            </div>
            <div id="spotifyBox">
              <div id="getSpotify" onClick={() => window.location = 'https://www.spotify.com/us' }>
                GET SPOTIFY
              </div>
            </div>
          </div>
          <a href="https://github.com/nevinod">
            <img id="github-icon" src="https://png.icons8.com/metro/1600/github.png" alt="GitHub"/>
          </a>
          <a href="https://www.linkedin.com/in/neil-vinod-751490159/">
            <img id="linkedin-icon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-256.png" alt="LinkedIn"/>
          </a>
          <a href="https://github.com/BrianisWinston">
            <img id="github-icon-winston" src="https://png.icons8.com/metro/1600/github.png" alt="GitHub"/>
          </a>
          <a href="https://www.linkedin.com/in/winston-galas-96ab3ba3/">
            <img id="linkedin-icon-winston" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-256.png" alt="LinkedIn"/>
          </a>
          <div >
            <PlaylistIndex
            data={this.state.playlists}
            getPlaylistSongs={this.getPlaylistSongs}
            recommendation={this.recommendation}
            getAlbumsFromSongs={this.getAlbumsFromSongs}
            recommended={this.state.recommended}/>
          </div>
        </div>
      )
    }
    else {
      return (
    <div >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
        <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet"></link>
      </head>
      <div id="login-screen"></div>
      <div id="navbar">
        <div id="logo-container">
          <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify"/>
          <span id="title">
            S 3
          </span>
        </div>
        <div id="spotifyBox">
          <div id="getSpotify" onClick={() => window.location = 'https://www.spotify.com/us' }>
            GET SPOTIFY
          </div>
        </div>
      </div>
      <div id="background">
      </div>
      <a href="https://github.com/nevinod">
        <img id="github-icon" src="https://png.icons8.com/metro/1600/github.png" alt="GitHub"/>
      </a>
      <a href="https://www.linkedin.com/in/neil-vinod-751490159/">
        <img id="linkedin-icon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-256.png" alt="LinkedIn"/>
      </a>
      <a href="https://github.com/BrianisWinston">
        <img id="github-icon-winston" src="https://png.icons8.com/metro/1600/github.png" alt="GitHub"/>
      </a>
      <a href="https://www.linkedin.com/in/winston-galas-96ab3ba3/">
        <img id="linkedin-icon-winston" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-256.png" alt="LinkedIn"/>
      </a>
      <div id="s3-pitch">
        <h1>
          The Spotify Song Selector
        </h1>
        <h3>
          Tired of the same old songs?
          <br/>
          <br/>
          S3 aims to provide the user with new and refreshing sound waves with a click of a button. After the user chooses a playlist from their profile, S3 provides a list of songs for the user to listen to that is similar in sound.
          <br/>
          <br/>
          Give it a try, login below!
          <div id="login-button" onClick={() => window.location = 'http://localhost:8888/login' }>
            LOGIN SPOTIFY
          </div>
        </h3>
      </div>
      <div id="bottom-bar">
      </div>
    </div>
    );
  }
  }



}

export default App;

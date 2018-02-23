import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'
import PlaylistIndex from './playlistIndex'

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      playlists: {},
      songs: {}
    }
  }

  componentWillMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    let that = this
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => this.setState({playlists: data }))
      // .then(() => that.getPlaylistSongs())
  }

  // getPlaylistSongs() {
  //   let parsed = queryString.parse(window.location.search)
  //   let accessToken = parsed.access_token
  //   if(this.state.playlists.items) {
  //     for(let i = 0; i < this.state.playlists.items.length; i++) {
  //       fetch(`https://api.spotify.com/v1/users/${this.state.playlists.items[i].owner.id}/playlists/${this.state.playlists.items[i].id}/tracks`, {
  //         headers: { 'Authorization': 'Bearer ' + accessToken }
  //       }).then(response => response.json())
  //         .then(data => this.setState({songs: data}))
  //     }
  //   }
  // }

  render() {
    // console.log(this.state);
    return (

    <div>
      <PlaylistIndex data={this.state.playlists}/>
      <div id="navbar">
        <div id="logo-container">
          <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify"/>
          <span id="title">
            S 3
          </span>
        </div>
        <div id="spotifyBox">
          <button id="getSpotify">
            GET SPOTIFY
          </button>
        </div>
      </div>
      <div id="background">
      </div>
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

export default App;

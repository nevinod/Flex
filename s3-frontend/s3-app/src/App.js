import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'
import playlistIndex from './playlistIndex'

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
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => window.location = 'http://localhost:8888/login' }>SIGN IN WITH SPOTIFY</button>

      </div>
    );
  }



}

export default App;

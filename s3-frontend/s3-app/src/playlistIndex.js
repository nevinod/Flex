import React from 'react';
import PlaylistItem from './playlistItem';

class PlaylistIndex extends React.Component {
  constructor() {
    super();
  }

  async combinedFuncs() {
      await this.props.getPlaylistSongs();
      this.props.getAlbumsFromSongs();
      this.props.recommendation();
    // console.log("HEWWO");
  }

  render() {
    console.log(this);
    if (this.props.recommended.tracks) {
      return (
        <div>
          <div id="playlist">
            <ul>
              { this.props.data.items.map(item =>
              <li>
                <div id="playlist-img" >
                  <img src={item.images[0].url} height="100" width="100" onClick={() => this.combinedFuncs()}/>
                  <h1 id="playlist-title">
                    {item.name}
                  </h1>
                </div>
              </li>)}
            </ul>
          </div>
          <div id="recommended-songs">
            <h2>
              Recommended Songs
            </h2>
            <h3>
              {this.props.recommended.tracks.map(song =>
              <li id="recommendation">
                <img src={song.album.images[0].url} height="100" width="100" />
                <h2 id="artist-name">
                  {song.artists[0].name}
                </h2>
                <h2 id="song-name">
                  {song.name}
                </h2>
              </li>
              )}
            </h3>
          </div>
        </div>
      )
    } else if (this.props.data.items) {
      return (
        <div id="playlist">
          <ul>
            { this.props.data.items.map(item =>
            <li id="playlist-item">
              <div id="playlist-img" >
                <img src={item.images[0].url} height="100" width="100" onClick={() => this.combinedFuncs()}/>
                <h2 id="playlist-title">
                  {item.name}
                </h2>
              </div>
            </li>)}
          </ul>
        </div>
      )
    } else {
      return (
      <div>
        <h1>waiting</h1>
      </div>
      )
    }
  }
}

export default PlaylistIndex;

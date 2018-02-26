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
                  <h3>
                    {item.name}
                  </h3>
                </div>
              </li>)}
            </ul>
          </div>
          <div id="recommended-songs">
            <h1>
              {this.props.recommended.tracks.map(song =>
              <li>
                {song.name}
              </li>
              )}
            </h1>
          </div>
        </div>
      )
    } else if (this.props.data.items) {
      return (
        <div id="playlist">
          <ul>
            { this.props.data.items.map(item =>
            <li>
              <div id="playlist-img" >
                <img src={item.images[0].url} height="100" width="100" onClick={() => this.combinedFuncs()}/>
                <h3>
                  {item.name}
                </h3>
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

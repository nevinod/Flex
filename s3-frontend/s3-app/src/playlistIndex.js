import React from 'react';
// import PlaylistItem from './playlistItem';

class PlaylistIndex extends React.Component {

  async combinedFuncs() {
      await this.props.getPlaylistSongs();
      this.props.getAlbumsFromSongs();
      this.props.recommendation();
    // console.log("HEWWO");
  }

  render() {
    // console.log(this);
    let first_url = []
    if(this.props.recommended.tracks) {
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[0].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[1].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[2].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[3].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[4].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[5].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[6].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[7].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[8].uri)
      first_url.push("https://open.spotify.com/embed?uri=" + this.props.recommended.tracks[9].uri)
      // console.log(first_url);
    }
    if (this.props.recommended.tracks ) {
      // if(this.props.recommended.tracks.length === 10) {
        return (
          <div id="everything-on-rec" className="animated fadeInRightBig">
            <div id="playlist">
              <ul>
                <h2>
                Playlists
                </h2>
                { this.props.data.items.map(item =>
                <li key={Math.random().toString(36).substr(2, 9)} onClick={() => this.combinedFuncs()}>
                    <div id="playlist-img" >
                      <img alt="" src={item.images[0].url} height="100" width="100"/>
                      <div id="playlist-info">
                        <h1 id="playlist-title">
                          {item.name}
                        </h1>
                        <h3 id="count-tracks">
                          {item.tracks.total.toString() + " songs"}
                        </h3>
                      </div>
                  </div>
                </li>)}
              </ul>
            </div>
            <div id="line"></div>
            <div id="recommended-songs">
              <h2 id="rec-title">
                Recommendations
              </h2>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[0]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[1]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[2]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[3]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[4]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[5]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[6]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[7]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[8]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title={Math.random().toString(36).substr(2, 9)} id="web-player" src={first_url[9]} width="350" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <ul>

              </ul>
            </div>
          </div>
        )
      // }
    } else if (this.props.data.items) {

      return (
        <div id="only-playlist">
          <div id="playlist">
            <ul>
            <h2>
            Playlists
            </h2>
              { this.props.data.items.map(item =>
              <li id="playlist-item" key={Math.random().toString(36).substr(2, 9)} onClick={() => this.combinedFuncs()}>
                <div id="playlist-img" >
                  <img alt="" src={item.images[0].url} height="100" width="100" />
                  <div id="playlist-info">
                    <h1 id="playlist-title">
                      {item.name}
                    </h1>
                    <h3 id="count-tracks">
                      {item.tracks.total.toString() + " songs"}
                    </h3>
                  </div>
                </div>
              </li>)}
            </ul>
          </div>
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

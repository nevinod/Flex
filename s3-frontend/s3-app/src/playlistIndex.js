import React from 'react';
import PlaylistItem from './playlistItem';

class PlaylistIndex extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this);
    if (this.props.data.items) {
      return (
        <div id="playlist">
          <ul>

              { this.props.data.items.map(item =>
              <li>
                <div id="playlist-img" >
                  <img src={item.images[0].url} height="100" width="100" onClick="nothing"/>
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

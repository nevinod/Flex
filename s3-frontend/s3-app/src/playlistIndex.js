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
        { this.props.data.items.map(item =>
          item.name) }
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

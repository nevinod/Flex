import React from 'react';

class PlaylistItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.playlist}
      </div>
    )
  }
}

export default PlaylistItem;

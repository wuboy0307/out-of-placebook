import React from 'react';

class FriendsBox extends React.Component {
  render() {
    return (
      <div className="timeline-side-bar-item">
        <div className="timeline-side-bar-header">
          Friends
        </div>
        <div className="timeline-friends-container">
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
          <img className="timeline-side-bar-friend" />
        </div>
      </div>
    );
  }
}

export default FriendsBox;

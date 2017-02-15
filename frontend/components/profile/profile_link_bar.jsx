import React from 'react';

class ProfileLinkBar extends React.Component {
  render () {
    return(
      <div className="profile-link-bar">
        <div className="link-item">Timeline</div>
        <div className="link-item">About</div>
        <div className="link-item">Friends</div>
        <div className="link-item">Photos</div>
      </div>
    );
  }
}

export default ProfileLinkBar;

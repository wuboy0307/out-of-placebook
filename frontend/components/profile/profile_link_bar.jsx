import React from 'react';

class ProfileLinkBar extends React.Component {
  render () {
    return(
      <div className="profile-link-bar">
        <div className="link-item"
          onClick={() => this.props.selectPage('timeline')}>Timeline</div>
        <div className="link-item">About</div>
        <div className="link-item"
          onClick={() => this.props.selectPage('friends')}>Friends</div>
        <div className="link-item"
          onClick={() => this.props.selectPage('photos')}>Photos</div>
      </div>
    );
  }
}

export default ProfileLinkBar;

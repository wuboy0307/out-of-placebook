import React from 'react';
import CoverPhoto from './cover_photo';
import ProfileLinkBar from './profile_link_bar';

class ProfileNavBar extends React.Component {
  render() {
    return(
      <div className="profile-nav-bar">
        <CoverPhoto />
        <ProfileLinkBar />
        <div className="profile-picture"></div>
        <div className="profile-name">Mark Zuckerberg</div>
      </div>
    );
  }
}

export default ProfileNavBar;

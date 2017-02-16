import React from 'react';
import CoverPhoto from './cover_photo';
import ProfileLinkBar from './profile_link_bar';

class ProfileNavBar extends React.Component {
  render() {
    return(
      <div className="profile-nav-bar">
        <CoverPhoto />
        <ProfileLinkBar />
        <div className="profile-picture"><img src="/assets/profilepic.jpg"/></div>
        <div className="profile-name">{this.props.profile.fname} {this.props.profile.lname}</div>
      </div>
    );
  }
}

export default ProfileNavBar;

import React from 'react';
import CoverPhoto from './cover_photo';
import ProfileLinkBar from './profile_link_bar';

class ProfileNavBar extends React.Component {
  render() {
    return(
      <div className="profile-nav-bar">
        <CoverPhoto photoUrl={this.props.profile.cover_url}/>
        <ProfileLinkBar />
        <div className="profile-picture"><img src={ this.props.profile.profile_url || `/assets/avatar.jpg`}/></div>
        <div className="profile-name">{this.props.profile.fname} {this.props.profile.lname}</div>
        <button className="profile-friend-button">Requested</button>
      </div>
    );
  }
}

export default ProfileNavBar;

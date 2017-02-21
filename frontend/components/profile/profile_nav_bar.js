import React from 'react';
import CoverPhoto from './cover_photo';
import ProfileLinkBar from './profile_link_bar';

class ProfileNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderFriendButton = this.renderFriendButton.bind(this);
  }

  renderFriendButton() {
    const friendStatus = this.props.profile.friendStatus;
    switch (friendStatus) {
      case "self":
        return null;

      case "outgoing":
        return(<button className="profile-friend-button">Requested</button>);

      case "incoming":
        return(<button className="profile-friend-button">Respond</button>);

      case "friends":
        return(<button className="profile-friend-button">Friends</button>);

      case "add":
        return(<button className="profile-friend-button">Add Friend</button>);

      default:
        return null;
    }
  }

  render() {
    return(
      <div className="profile-nav-bar">
        <CoverPhoto photoUrl={this.props.profile.cover_url}/>
        <ProfileLinkBar />
        <div className="profile-picture"><img src={ this.props.profile.profile_url || `/assets/avatar.jpg`}/></div>
        <div className="profile-name">{this.props.profile.fname} {this.props.profile.lname}</div>
        { this.renderFriendButton() }
      </div>
    );
  }
}

export default ProfileNavBar;

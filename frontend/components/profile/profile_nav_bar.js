import React from 'react';
import CoverPhoto from './cover_photo';
import { connect } from 'react-redux';
import ProfileLinkBar from './profile_link_bar';
import { addFriendRequest, removeFriendRequest, respondToFriendRequest } from '../../actions/friend_actions';

const mapDispatchToProps = (dispatch) => ({
  addFriendRequest: (friend) => dispatch(addFriendRequest(friend)),
  removeFriendRequest: (friend) => dispatch(removeFriendRequest(friend)),
  respondToFriendRequest: (friend) => dispatch(respondToFriendRequest(friend))
});

const mapStateToProps = (state) => ({
  friends: state.friends,
  currentUser: state.auth.currentUser
});

class ProfileNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderFriendButton = this.renderFriendButton.bind(this);
    this.friendAction = this.friendAction.bind(this);
  }

  friendAction(e) {
    const friends = this.props.friends;
    const profileId = this.props.profile.id;
    if (this.props.currentUser.id === profileId) return null;

    e.preventDefault();
    let friendObj;
    if (friends.friends[profileId]) {
      friendObj = {target_id: profileId};
      this.props.removeFriendRequest(friendObj);
    } else if (friends.outgoingFriends[profileId]) {
      return(<button className="profile-friend-button">Cancel Request</button>);
    } else if (friends.incomingFriends[profileId])  {
      friendObj = {target_id: profileId, type: 'accept'};
      this.props.respondToFriendRequest(friendObj);
    } else {
      friendObj = {target_id: profileId};
      this.props.addFriendRequest(friendObj);
    }
  }

  renderFriendButton() {
    const friends = this.props.friends;
    const profileId = this.props.profile.id;

    if (this.props.currentUser.id === profileId) {
      return null;
    }

    if (friends.friends[profileId]) {
      return(<button className="profile-friend-button" onClick={this.friendAction}>Remove Friend</button>);
    } else if (friends.outgoingFriends[profileId]) {
      return(<button className="profile-friend-button" onClick={this.friendAction}>Cancel Request</button>);
    } else if (friends.incomingFriends[profileId])  {
      return(<button className="profile-friend-button" onClick={this.friendAction}>Accept Request</button>);
    } else {
      return(<button className="profile-friend-button" onClick={this.friendAction}>Add Friend</button>);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNavBar);

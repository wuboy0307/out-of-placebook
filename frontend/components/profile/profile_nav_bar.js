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
  }

  friendAction(e) {
    e.preventDefault();
    const friendStatus = this.props.profile.friendStatus;
    switch (friendStatus) {
      case "add":
        this.props.addFriendRequest({target_id: this.props.profile.id});
    }
  }

  renderFriendButton() {
    const friends = this.props.friends;
    const profileId = this.props.profile.id;

    if (this.props.currentUser.id === profileId) {
      return null;
    }

    if (friends.friends[profileId]) {
      return(<button className="profile-friend-button">Remove Friend</button>);
    } else if (friends.outgoingFriends[profileId]) {
      return(<button className="profile-friend-button">Cancel Request</button>);
    } else if (friends.incomingFriends[profileId])  {
      return(<button className="profile-friend-button">Accept Request</button>);
    } else {
      return(<button className="profile-friend-button">Add Friend</button>);
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

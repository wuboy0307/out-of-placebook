import React from 'react';
import CoverPhoto from './cover_photo';
import { connect } from 'react-redux';
import ProfileLinkBar from './profile_link_bar';
import { addFriendRequest, removeFriendRequest, respondToFriendRequest } from '../../actions/friend_actions';
import {createOrFetchChatRequest } from '../../actions/notification_actions';
import {profilePicUploadRequest } from '../../actions/profile_actions';

const mapDispatchToProps = (dispatch) => ({
  addFriendRequest: (friend) => dispatch(addFriendRequest(friend)),
  removeFriendRequest: (friend) => dispatch(removeFriendRequest(friend)),
  respondToFriendRequest: (friend) => dispatch(respondToFriendRequest(friend)),
  createOrFetchChatRequest: (user) => dispatch(createOrFetchChatRequest(user)),
  profilePicUploadRequest: (formData) => dispatch(profilePicUploadRequest(formData))
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
    this.renderMutualFriendCount = this.renderMutualFriendCount.bind(this);
    this.messageAction = this.messageAction.bind(this);
    this.renderFriendButton = this.renderFriendButton.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.disableUnlessOwnProfile = this.disableUnlessOwnProfile.bind(this);
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
      friendObj = {target_id: profileId, type: 'cancel'};
      this.props.respondToFriendRequest(friendObj);
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

  messageAction(e){
    e.preventDefault();
    this.props.createOrFetchChatRequest({user_id: this.props.profile.id});
  }

  renderMessageButton() {
    const profileId = this.props.profile.id;
    if (this.props.currentUser.id === profileId) {
      return null;
    }
    return(<button className="profile-message-button" onClick={this.messageAction}>Message</button>);
  }

  renderMutualFriendCount() {
    const profileId = this.props.profile.id;
    let myFriends = Object.keys(this.props.friends.friends).map((n) => parseInt(n));
    let theirFriends = this.props.profile.friendIds;
    let mutualFriends = myFriends.filter((n) => theirFriends.indexOf(n) !== -1).length;
    if (mutualFriends === 0 || this.props.friends.friends[profileId] || this.props.currentUser.id === profileId) return null;
    return(
      <div className="mutual-friend-count">{mutualFriends} mutual {mutualFriends > 1 ? "friends" : "friend"}</div>
    );
  }

  updateFile(e) {
    let fileReader = new FileReader();
    let file = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({ image_file: file, image_preview_url: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
      let formData = new FormData();
      formData.id = this.props.currentUser.id;
      formData.append("profile[image]", file);
      this.props.profilePicUploadRequest(formData);
    }
   }

   disableUnlessOwnProfile() {
     if (this.props.profile.id !== this.props.currentUser.id) return null;
     this.pictureInput.click();
   }

  render() {
    return(
      <div className="profile-nav-bar">
        <CoverPhoto photoUrl={this.props.profile.coverUrl}/>
        <ProfileLinkBar />
        <div className="profile-picture" onClick={this.disableUnlessOwnProfile}>
          <div className="profile-picture-change">Update Profile Picture</div>
          <img src={ this.props.profile.avatarUrl || `/assets/avatar.jpg`}/>
          <form>
            <input type="file"
                id="file-input"
                onChange={this.updateFile} ref={(input) => this.pictureInput = input}/>
          </form>
          </div>
        <div className="profile-name">{this.props.profile.fname} {this.props.profile.lname}</div>
        { this.renderMessageButton() }
        { this.renderFriendButton() }
        { this.renderMutualFriendCount() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNavBar);

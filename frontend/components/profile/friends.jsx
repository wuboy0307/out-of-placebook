import React from 'react';
import { connect } from 'react-redux';
import { selectFriendDetails } from '../../reducers/selectors';
import { Link, withRouter } from 'react-router';

const mapStateToProps = state => ({
  myFriends: state.friends.friends,
  friends: state.profile.friends,
  profile: state.profile,
  currentUserId: state.auth.currentUser.id
});

class Friends extends React.Component {

  linkToFriend(id) {
    this.props.router.push(`/profile/${id}`);
    this.props.selectPage('timeline');
  }

  render () {
    return(
      <div className="friends">
        <h1>Friends</h1>
        <ul className="friend-list">
          {this.props.friends.map((friend) => {
            const profileId = this.props.profile.id;
            let myFriends = Object.keys(this.props.myFriends).map((n) => parseInt(n));
            let theirFriends = friend.friendIds;
            let mutualFriends = myFriends.filter((n) => theirFriends.indexOf(n) !== -1).length;

            let friendText;
            if (mutualFriends > 1) {
              friendText = `${mutualFriends} Mutual Friends`;
            } else if (mutualFriends > 0){
              friendText = `${mutualFriends} Mutual Friend`;
            } else {
              friendText = '';
            }

            if (friend.id === this.props.currentUserId) {
              friendText = '';
            }

            return(
              <li className="friend-list-item" key={friend.id}>
                <img className="user-pic-friend" src={friend.thumbUrl}></img>
                <div className="friend-list-body">
                    <div className="friend-list-name"
                      onClick={() => this.linkToFriend(friend.id)}>
                      {friend.fullName}
                    </div>
                  <div className="friend-list-mutual">{friendText}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(Friends));

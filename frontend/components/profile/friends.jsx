import React from 'react';
import { connect } from 'react-redux';
import { selectFriendDetails } from '../../reducers/selectors';
import { Link, withRouter } from 'react-router';

const mapStateToProps = state => ({
  friends: state.profile.friends
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
            return(
              <li className="friend-list-item" key={friend.id}>
                <img className="user-pic-friend" src={friend.thumbUrl}></img>
                <div className="friend-list-body">
                    <div className="friend-list-name"
                      onClick={() => this.linkToFriend(friend.id)}>{friend.fullName}</div>
                  <div className="friend-list-mutual">1231</div>
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

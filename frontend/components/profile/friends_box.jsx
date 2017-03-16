import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { toggleFlyout } from '../../actions/flyout_actions';

const mapStateToProps = state => ({
  friends: state.profile.friends
});

const mapDispatchToProps = dispatch => ({
  toggleFlyout: (flyoutType, data) => dispatch(toggleFlyout(flyoutType, data))
});

class FriendsBox extends React.Component {
  constructor(props){
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal(type, data) {
    return (e) => {
      e.stopPropagation();
      this.props.toggleFlyout('modal', {type, data});
    };
  }
  render() {
    if (!this.props.friends) return null;
    return (
      <div className="timeline-side-bar-item">
        <div className="timeline-side-bar-header">
          <i className="fa fa-users fa-2x" aria-hidden="true"></i><span>Friends {this.props.profile.friendIds.length}</span>
        </div>
        <div className="timeline-friends-container">
          { this.props.friends.slice(0,9).map((friend) => {
            return(
              <div className="timeline-side-bar-friend" key={friend.id}>
                <Link to={`/profile/${friend.id}`}  className="timeline-side-bar-friend-link">
                  <img src={friend.thumbUrl} className="timeline-side-bar-friend" />
                  <div className="timeline-side-bar-friend-name">{friend.fullName}</div>
                </Link>
              </div>
              );
          })}

        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsBox);

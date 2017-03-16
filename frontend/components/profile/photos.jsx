import React from 'react';
import { connect } from 'react-redux';
import { selectFriendDetails } from '../../reducers/selectors';
import { Link, withRouter } from 'react-router';
import { toggleFlyout } from '../../actions/flyout_actions';

const mapStateToProps = state => ({
  photos: state.profile.photos
});

const mapDispatchToProps = dispatch => ({
  toggleFlyout: (flyoutType, data) => dispatch(toggleFlyout(flyoutType, data))
});

class Photos extends React.Component {

  linkToFriend(id) {
    this.props.router.push(`/profile/${id}`);
    this.props.selectPage('timeline');
  }

  enableModal(e,type, data) {
    e.stopPropagation();
    this.props.toggleFlyout('modal', {type, data});
  }

  render () {
    return(
      <div className="photos">
        <h1>Photos</h1>
        <ul className="photo-list">
          {this.props.photos.map((photo) => {
            return(
              <li className="photo-list-item" key={photo.id}>
                <img className="user-pic-photo"
                  src={photo.photoUrl}
                  onClick={(e) => this.enableModal(e,'photo', photo.imageUrlOriginal)}></img>
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
  mapDispatchToProps
)(withRouter(Photos));

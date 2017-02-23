import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleFlyout } from '../../actions/flyout_actions';

const mapStateToProps = state => ({
  photos: state.profile.photos
});

const mapDispatchToProps = dispatch => ({
  toggleFlyout: (flyoutType, data) => dispatch(toggleFlyout(flyoutType, data))
});

class PhotosBox extends React.Component {
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
    return (
      <div className="timeline-side-bar-item">
        <div className="timeline-side-bar-header">
          <i className="fa fa-camera fa-2x" aria-hidden="true"></i><span>Photos</span>
        </div>
        <div className="timeline-photos-container">
          { this.props.photos.map((photo) => {
            return(<img className="timeline-side-bar-photo" src={photo.thumbUrl} key={photo.id}
              onClick={this.renderModal('photo', photo.imageUrlOriginal)} />);
          })}

        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PhotosBox));

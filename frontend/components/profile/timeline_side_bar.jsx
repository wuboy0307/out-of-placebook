import React from 'react';
import PhotosBox from './photos_box';
import FriendsBox from './friends_box';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import stickykit from 'sticky-kit/dist/sticky-kit';

const mapStateToProps = (state) => ({
  profileList: state.profiles.profileList
});

class TimelineSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderIntro = this.renderIntro.bind(this);
  }

  componentDidMount() {
    $('.timeline-side-bar-sticky').stick_in_parent();
  }

  renderIntro(currentUser) {

    if (!currentUser.intro) {
      if (window.currentUser.id === currentUser.id) {
        return(
          <div className="timeline-side-bar-item">
            <div className="timeline-side-bar-header">
              <i className="fa fa-globe fa-2x" aria-hidden="true"></i><span>Intro</span>
            </div>
            <div className="timeline-description">You don't have an intro yet? How about writing one?</div>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return(
        <div className="timeline-side-bar-item">
          <div className="timeline-side-bar-header">
            <i className="fa fa-globe fa-2x" aria-hidden="true"></i><span>Intro</span>
          </div>
        <div className="timeline-description">{ currentUser.intro }</div>
        </div>);
    }
  }

  render () {
    const currentUserProfile = this.props.profileList[this.props.params.profileId];
    return(
      <div className="timeline-side-bar">
        <div className="timeline-side-bar-sticky">
          { this.renderIntro(currentUserProfile) }

          <PhotosBox />
          <FriendsBox currentUserProfile={currentUserProfile}/>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(TimelineSideBar));

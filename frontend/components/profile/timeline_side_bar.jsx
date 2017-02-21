import React from 'react';
import PhotosBox from './photos_box';
import FriendsBox from './friends_box';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import stickykit from 'sticky-kit/dist/sticky-kit';

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentUser: state.auth.currentUser
});

class TimelineSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderIntro = this.renderIntro.bind(this);
  }

  componentDidMount() {
    $('.timeline-side-bar-sticky').stick_in_parent();
    $('.header-nav').stick_in_parent();
  }

  renderIntro() {

    if (!this.props.profile.intro) {
      if (this.props.currentUser.id === this.props.profile.id) {
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
        <div className="timeline-description">{ this.props.profile.intro }</div>
        </div>);
    }
  }

  render () {
    const profile = this.props.profile;
    return(
      <div className="timeline-side-bar">
        <div className="timeline-side-bar-sticky">
          { this.renderIntro() }

          <PhotosBox />
          <FriendsBox profile={profile}/>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(TimelineSideBar));

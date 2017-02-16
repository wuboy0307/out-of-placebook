import React from 'react';
import { connect } from 'react-redux';
import ProfileNavBar from '../profile/profile_nav_bar';
import Timeline from '../profile/timeline';
import { fetchSingleProfileRequest } from '../../actions/profile_actions';

const mapStateToProps = (state) => ({
  profileList: state.profiles.profileList
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProfileRequest: (profileId) => dispatch(fetchSingleProfileRequest(profileId))
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.profileId !== newProps.params.profileId) {
      this.props.fetchSingleProfileRequest(newProps.params.profileId);
    }
  }

  componentDidMount() {
    this.props.fetchSingleProfileRequest(this.props.params.profileId);
  }

  render() {
    const currentUserProfile = this.props.profileList[this.props.params.profileId];
    if (!currentUserProfile) {
      return null;
    }
    return(
      <div className="home">
        <ProfileNavBar profile={currentUserProfile} />
        <Timeline profile={currentUserProfile} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

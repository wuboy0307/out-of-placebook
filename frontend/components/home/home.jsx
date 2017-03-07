import React from 'react';
import { connect } from 'react-redux';
import ProfileNavBar from '../profile/profile_nav_bar';
import Timeline from '../profile/timeline';
import { fetchSingleProfileRequest } from '../../actions/profile_actions';

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentUser: state.auth.currentUser
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
    const profile = this.props.profile;
    if (!profile.id) {
      return null;
    }
    if (profile.id != this.props.params.profileId) {
      return null;
    }
    return(
      <div className="home">
        <ProfileNavBar />
        <Timeline profile={profile} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

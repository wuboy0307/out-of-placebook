import React from 'react';
import { connect } from 'react-redux';
import ProfileNavBar from '../profile/profile_nav_bar';
import Timeline from '../profile/timeline';
import { fetchSingleProfileRequest } from '../../actions/profile_actions';
import Friends from '../profile/friends';
import Photos from '../profile/photos';

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
    this.setChildPage = this.setChildPage.bind(this);
    this.renderChildPage = this.renderChildPage.bind(this);
    this.state = {
      displaying: 'timeline'
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.profileId !== newProps.params.profileId) {
      this.props.fetchSingleProfileRequest(newProps.params.profileId)
        .then(() => this.setState({displaying: 'timeline'}));
    }
  }

  componentDidMount() {
    this.props.fetchSingleProfileRequest(this.props.params.profileId);
  }

  setChildPage(child) {
    this.setState({displaying: child});
  }

  renderChildPage() {
    const profile = this.props.profile;
    switch(this.state.displaying) {
      case 'timeline':
        return (<Timeline profile={profile} />);

      case 'friends':
        return (<Friends selectPage={this.setChildPage}/>);

      case 'photos':
        return (<Photos selectPage={this.setChildPage}/>);

      default:
        return null;
    }
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
        <ProfileNavBar selectPage={this.setChildPage}
          currentPage={this.state.displaying}/>
        { this.renderChildPage() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

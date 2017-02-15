import React from 'react';
import ProfileNavBar from '../profile/profile_nav_bar';
import Timeline from '../profile/timeline';

class Home extends React.Component {
  render() {
    return(
      <div className="home">
        <ProfileNavBar />
        <Timeline />
      </div>
    );
  }
}

export default Home;
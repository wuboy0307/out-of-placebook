import React from 'react';


class NavBar extends React.Component {
  render() {
    return(
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-left-side">
            <div className="small-logo">OOP</div>
            <div className="search-form">Form to search</div>
          </div>
          <div className="nav-right-side">
            <div className="nav-link-profile">Mark</div>
            <div className="nav-link-home">Home</div>
            <div className="notifications-bar">
              <div>Friends</div>
              <div>Messages</div>
              <div>Notifications</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

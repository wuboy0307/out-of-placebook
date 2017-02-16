import React from 'react';


class NavBar extends React.Component {
  render() {
    return(
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-left-side">
            <div className="small-logo">O</div>
            <form className="search-form">
              <div className="search-form-input">
                <input type="text" placeholder="search" />
              </div>
              <button type="button">Search</button>
            </form>
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

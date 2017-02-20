import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications
});

class NavBar extends React.Component {
  render() {
    const currentUser = this.props.currentUser;
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
            <div className="nav-link-profile"><img className="user-pic-header" src={currentUser.avatar_url}/>{currentUser.fname}</div>
            <div className="nav-link-home">Home</div>
            <div className="notifications-bar">
              <div><i className="fa fa-users" aria-hidden="true"></i></div>
              <div><i className="fa fa-comments" aria-hidden="true"></i></div>
              <div className="small-notification-count">{this.props.notifications.count}</div>

              <div className="flyout">
                <div className="flyout-header">
                  Notifications
                </div>
                <div className="flyout-list">
                  <li className="flyout-list-item">
                    <img className="user-pic-flyout" />
                    <div className="flyout-item-body">
                      <div className="flyout-item-text">Item 1</div>
                      <div className="flyout-item-timestamp">Item 1</div>
                    </div>
                  </li>
                  <li className="flyout-list-item">
                    <img className="user-pic-flyout" />
                    <div className="flyout-item-body">
                      <div className="flyout-item-text">Item 1</div>
                      <div className="flyout-item-timestamp">Item 1</div>
                    </div>
                  </li>
                </div>
              </div>

              <div><i className="fa fa-globe" aria-hidden="true"></i></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(NavBar);

import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications
});

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.params.profileId !== newProps.params.profileId) {
  //     this.props.fetchSingleProfileRequest(newProps.params.profileId)
  //       .then(() => this.props.fetchNotificationCountRequest())
  //       .then(() => this.props.fetchNotificationsRequest());
  //   }
  // }

  renderNotifications() {
    if (!this.props.notifications.list) {
      return null;
    }
    return this.props.notifications.list.map((el, idx) => {
      return(
        <li className="flyout-list-item" key={idx}>
          <img className="user-pic-flyout" src={el[2]}/>
          <div className="flyout-item-body">
            <div className="flyout-item-text">{el[0]}</div>
            <div className="flyout-item-timestamp">{el[1]}</div>
          </div>
        </li>
      );
    });
  }

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

                  { this.renderNotifications() }

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

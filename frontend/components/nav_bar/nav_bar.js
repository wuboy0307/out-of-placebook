import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsRequest: () => dispatch(fetchNotificationsRequest())
});

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.clickNotificationButton = this.clickNotificationButton.bind(this);
    this.state = {
      flyoutVisible: false
    };
  }

  componentWillReceiveProps() {
    this.setState({flyoutVisible: false});
  }

  clickNotificationButton() {
    if (this.props.notifications.count > 0) {
      if (!this.state.flyoutVisible) {
        this.props.fetchNotificationsRequest().then(() => {
          this.setState({flyoutVisible: !this.state.flyoutVisible});
          // debugger
        });
      } else {
        this.setState({flyoutVisible: !this.state.flyoutVisible});
      }
    } else {
      this.setState({flyoutVisible: !this.state.flyoutVisible});
    }
  }

  renderNotifications() {
    if (!this.state.flyoutVisible) {
      return null;
    }
    return (<div className="flyout">
      <div className="flyout-header">
        Notifications
      </div>
      <div className="flyout-list">
       {this.props.notifications.list.map((el, idx) => {
        return(
          <li className="flyout-list-item" key={idx}>
            <img className="user-pic-flyout" src={el[2]}/>
            <div className="flyout-item-body">
              <div className="flyout-item-text">{el[0]}</div>
              <div className="flyout-item-timestamp">{el[1]}</div>
            </div>
          </li>
        );
      })}
    </div>
  </div>
  );
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



                  { this.renderNotifications() }



              <div><i className="fa fa-globe" aria-hidden="true" onClick={this.clickNotificationButton}></i></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

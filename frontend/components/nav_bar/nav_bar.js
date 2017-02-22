import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Search from '../search/search';
import { fetchNotificationsRequest, fetchNotificationCountRequest } from '../../actions/notification_actions';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsRequest: () => dispatch(fetchNotificationsRequest()),
  fetchNotificationCountRequest: () => dispatch(fetchNotificationCountRequest()),
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

  componentDidMount() {
    Pusher.logToConsole = true;

    var pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });

    var channel = pusher.subscribe(`notifications-${this.props.currentUser.id}`);
    channel.bind('new-notification', () => {
      this.props.fetchNotificationCountRequest();
    });
  }

  componentWillReceiveProps() {
    this.setState({flyoutVisible: false});
  }


  clickNotificationButton() {
    if (this.props.notifications.count > 0 || this.props.notifications.list.length < 1) {
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
          <Link to={`/post/${el[3]}`} key={idx}>
          <li className="flyout-list-item">
            <img className="user-pic-flyout" src={el[2]}/>
            <div className="flyout-item-body">
              <div className="flyout-item-text">{el[0]}</div>
              <div className="flyout-item-timestamp">{el[1]}</div>
            </div>
          </li>
        </Link>
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
            <Link to="/newsfeed">
              <div className="small-logo">O</div>
            </Link>

            <Search />

          </div>
          <div className="nav-right-side">
            <div className="nav-link-profile"><img className="user-pic-header" src={currentUser.avatar_url}/>
            <Link to={`profile/${currentUser.id}`}>{currentUser.fname}</Link>
          </div>
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

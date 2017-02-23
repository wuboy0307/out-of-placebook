import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Search from '../search/search';
import { toggleFlyout } from '../../actions/flyout_actions';
import { fetchNotificationsRequest, fetchNotificationCountRequest,
        fetchMessageNotificationCountRequest, fetchMessagesRequest,
      fetchChatRequest } from '../../actions/notification_actions';
import { fetchFriendCountRequest } from '../../actions/friend_actions';
import { logout} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications,
  messages: state.messages,
  flyout: state.flyout.flyout,
  friends: state.friends
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsRequest: () => dispatch(fetchNotificationsRequest()),
  fetchNotificationCountRequest: () => dispatch(fetchNotificationCountRequest()),
  fetchMessageNotificationCountRequest: () => dispatch(fetchMessageNotificationCountRequest()),
  fetchMessagesRequest: () => dispatch(fetchMessagesRequest()),
  fetchChatRequest: (channelId) => dispatch(fetchChatRequest(channelId)),
  toggleFlyout: (flyoutType) => dispatch(toggleFlyout(flyoutType)),
  logout: () => dispatch(logout()),
  fetchFriendCountRequest: () => dispatch(fetchFriendCountRequest())
});


class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.clickNotificationButton = this.clickNotificationButton.bind(this);
    this.clickMessageNotificationButton = this.clickMessageNotificationButton.bind(this);
    this.fetchChat = this.fetchChat.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      notificationFlyout: false,
      messageFlyout: false
    };
  }

  componentDidMount() {
    this.props.fetchMessageNotificationCountRequest();
    this.props.fetchFriendCountRequest();
    this.props.fetchMessageNotificationCountRequest();
    Pusher.logToConsole = true;

    var pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });

    var channel = pusher.subscribe(`notifications-${this.props.currentUser.id}`);

    channel.bind('new-notification', () => {
      this.props.fetchNotificationCountRequest();
    });
    channel.bind('new-message-notification', () => {
      this.props.fetchMessageNotificationCountRequest();
    });
    channel.bind('new-friend-notification', () => {
      this.props.fetchFriendCountRequest();
    });
  }

  componentWillReceiveProps() {
    this.setState({notificationFlyout: false});
  }


  clickNotificationButton(e) {
    e.stopPropagation();
    if (this.props.toggleFlyout !== 'notifications') {
      this.props.fetchNotificationsRequest().then(() => {
        this.props.toggleFlyout('notifications');
      });
    } else {
    this.props.toggleFlyout('notifications');
  }
  }

  clickMessageNotificationButton(e) {
    e.stopPropagation();
    if (this.props.toggleFlyout !== 'messages') {
      this.props.fetchMessagesRequest().then(() => {
        this.props.toggleFlyout('messages');
      });
    } else {
    this.props.toggleFlyout('messages');
  }
  }

  fetchChat(channelId) {
    return (e) => this.props.fetchChatRequest(channelId);
  }

  renderMessages() {
    if (this.props.flyout !== 'messages') {
      return null;
    }

    return (<div className="messages-flyout">
      <div className="flyout-header">
        Messages
      </div>
      <div className="flyout-list">
       {this.props.messages.chats.map((el, idx) => {
        return(
          <div onClick={this.fetchChat(el.channelId)} key={idx}>
          <li className={el.numUnseenMessages > 0 ? 'message-list-item-seen' : 'message-list-item'}>
            <img className="user-pic-flyout" src={el.lastMessageAvatar}/>
            <div className="flyout-item-body">
              <div className="flyout-item-text">{el.channelText} {el.numUnseenMessages ? `(${el.numUnseenMessages})` : null}</div>
              <div className="flyout-item-text">{el.lastMessage}</div>
              <div className="flyout-item-timestamp">{el.lastMessageTime}</div>
            </div>
          </li>
          </div>
        );
      })}
    </div>
  </div>
  );
  }

  renderNotifications() {
    if (this.props.flyout !== 'notifications') {
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

  logout() {
    this.props.logout();
    this.props.router.push('/signup');
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
            <div className="nav-link-profile"><img className="user-pic-header" src={currentUser.avatarHeader}/>
            <Link to={`profile/${currentUser.id}`}>{currentUser.fname}</Link>
          </div>
            <div className="nav-link-home"><Link to="/newsfeed">Home</Link></div>
            <div className="notifications-bar">
              <div><i className="fa fa-users notification" aria-hidden="true">
                <div className="small-notification-count">{this.props.friends.notificationCount}</div>
              </i></div>
              <div><i className="fa fa-comments notification" aria-hidden="true" onClick={this.clickMessageNotificationButton}>
                <div className="small-notification-count">{this.props.messages.numUnseenChats}</div>
              </i></div>




                {this.renderMessages()}
                { this.renderNotifications() }



              <div><i className="fa fa-globe notification" aria-hidden="true" onClick={this.clickNotificationButton}>
                  <div className="small-notification-count">{this.props.notifications.count}</div>
                  </i></div>

                <div className="logout"><i className="fa fa-sign-out" aria-hidden="true" onClick={this.logout}></i></div>
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
)(withRouter(NavBar));

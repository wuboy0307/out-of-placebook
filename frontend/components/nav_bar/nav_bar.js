import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Search from '../search/search';
import { fetchNotificationsRequest, fetchNotificationCountRequest,
        fetchMessageNotificationCountRequest, fetchMessagesRequest,
      fetchChatRequest } from '../../actions/notification_actions';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsRequest: () => dispatch(fetchNotificationsRequest()),
  fetchNotificationCountRequest: () => dispatch(fetchNotificationCountRequest()),
  fetchMessageNotificationCountRequest: () => dispatch(fetchMessageNotificationCountRequest()),
  fetchMessagesRequest: () => dispatch(fetchMessagesRequest()),
  fetchChatRequest: (channelId) => dispatch(fetchChatRequest(channelId))
});


class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.clickNotificationButton = this.clickNotificationButton.bind(this);
    this.clickMessageNotificationButton = this.clickMessageNotificationButton.bind(this);
    this.fetchChat = this.fetchChat.bind(this);
    this.state = {
      notificationFlyout: false,
      messageFlyout: false
    };
  }

  componentDidMount() {
    this.props.fetchMessageNotificationCountRequest();
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
    this.setState({notificationFlyout: false});
  }


  clickNotificationButton() {
    if (this.props.notifications.count > 0 || this.props.notifications.list.length < 1) {
      if (!this.state.notificationFlyout) {
        this.props.fetchNotificationsRequest().then(() => {
          this.setState({notificationFlyout: !this.state.notificationFlyout});
          // debugger
        });
      } else {
        this.setState({notificationFlyout: !this.state.notificationFlyout});
      }
    } else {
      this.setState({notificationFlyout: !this.state.notificationFlyout});
    }
  }

  clickMessageNotificationButton() {
    if (this.props.messages.numUnseenChats > 0 || this.props.messages.chats.length < 1) {
      if (!this.state.messageFlyout) {
        this.props.fetchMessagesRequest().then(() => {
          this.setState({messageFlyout: !this.state.messageFlyout});
          // debugger
        });
      } else {
        this.setState({messageFlyout: !this.state.messageFlyout});
      }
    } else {
      this.setState({messageFlyout: !this.state.messageFlyout});
    }
  }

  fetchChat(channelId) {
    return (e) => this.props.fetchChatRequest(channelId);
  }

  renderMessages() {
    if (!this.state.messageFlyout) {
      return null;
    }

    return (<div className="messages-flyout">
      <div className="flyout-header">
        Messages
      </div>
      <div className="flyout-list">
       {this.props.messages.chats.map((el, idx) => {
        return(
          <div onClick={this.fetchChat(el.channelId)}>
          <li className={el.numUnseenMessages > 0 ? 'message-list-item-seen' : 'message-list-item'}>
            <img className="user-pic-flyout" src={el.image}/>
            <div className="flyout-item-body">
              <div className="flyout-item-text">{el.lastMessageFullName} {el.numUnseenMessages ? `(${el.numUnseenMessages})` : null}</div>
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
    if (!this.state.notificationFlyout) {
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
              <div><i className="fa fa-comments" aria-hidden="true" onClick={this.clickMessageNotificationButton}></i></div>
              <div className="small-notification-count">{this.props.notifications.count}</div>
              <div className="small-messages-count">{this.props.messages.numUnseenChats}</div>


                {this.renderMessages()}
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

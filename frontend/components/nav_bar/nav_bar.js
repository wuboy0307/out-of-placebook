import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Search from '../search/search';
import { toggleFlyout } from '../../actions/flyout_actions';
import {fetchNotificationsRequest,
        fetchNotificationCountRequest,
        fetchMessageNotificationCountRequest,
        fetchMessagesRequest,
        fetchChatRequest } from '../../actions/notification_actions';
import { fetchFriendCountRequest,
          fetchFriendsRequest,
          respondToFriendRequest } from '../../actions/friend_actions';
import { logout} from '../../actions/session_actions';
import { selectFriendRequests } from '../../reducers/selectors.js';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications,
  messages: state.messages,
  flyout: state.flyout.flyout,
  friends: state.friends,
  friendRequests: selectFriendRequests(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsRequest: () => dispatch(fetchNotificationsRequest()),
  fetchNotificationCountRequest: () =>
    dispatch(fetchNotificationCountRequest()),
  fetchMessageNotificationCountRequest: () =>
    dispatch(fetchMessageNotificationCountRequest()),
  fetchMessagesRequest: () => dispatch(fetchMessagesRequest()),
  fetchChatRequest: (channelId) => dispatch(fetchChatRequest(channelId)),
  toggleFlyout: (flyoutType) => dispatch(toggleFlyout(flyoutType)),
  logout: () => dispatch(logout()),
  fetchFriendCountRequest: () => dispatch(fetchFriendCountRequest()),
  fetchFriendsRequest: () => dispatch(fetchFriendsRequest()),
  respondToFriendRequest: (action) => dispatch(respondToFriendRequest(action))
});


class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.fetchChat = this.fetchChat.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.clickMessageNotificationButton =
      this.clickMessageNotificationButton.bind(this);
    this.clickFriendNotificationButton =
      this.clickFriendNotificationButton.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.clickNotificationButton = this.clickNotificationButton.bind(this);
    this.state = {
      notificationFlyout: false,
      messageFlyout: false
    };
  }

  componentDidMount() {
    this.props.fetchMessageNotificationCountRequest();
    this.props.fetchFriendCountRequest();
    this.props.fetchMessageNotificationCountRequest();
    // Pusher.logToConsole = true;

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
      console.log('received')
      this.props.fetchFriendCountRequest();
      this.props.fetchFriendsRequest();
    });
  }

  componentWillReceiveProps() {
    this.setState({notificationFlyout: false});
  }


  clickNotificationButton(e) {
    e.stopPropagation();
    if (this.props.flyout !== 'notifications') {
      this.props.fetchNotificationsRequest().then(() => {
        this.props.toggleFlyout('notifications');
      });
    } else {
    this.props.toggleFlyout('notifications');
  }
  }

  clickMessageNotificationButton(e) {
    e.stopPropagation();
    if (this.props.flyout !== 'messages') {
      this.props.fetchMessagesRequest().then(() => {
        this.props.toggleFlyout('messages');
      });
    } else {
    this.props.toggleFlyout('messages');
  }
  }

  clickFriendNotificationButton(e) {
    e.stopPropagation();
    if (this.props.flyout !== 'friends') {
      this.props.fetchFriendsRequest().then(() => {
        this.props.toggleFlyout('friends');
      });
    } else {
    this.props.toggleFlyout('friends');
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
          <li className={el.numUnseenMessages > 0 ? 'message-list-item' : 'message-list-item-seen'}>
            <img className="user-pic-flyout" src={el.lastMessageAvatar}/>
            <div className="flyout-item-body">
              <div className="flyout-item-text bold">{el.channelText} {el.numUnseenMessages > 0 ? `(${el.numUnseenMessages})` : null}</div>
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


  renderFriends() {
    if (this.props.flyout !== 'friends') {
      return null;
    }
    if (this.props.friendRequests.length < 1) {
      return(<div className="friends-flyout">
        <div className="flyout-header">
          Friend Requests
        </div>
        <li className='flyout-list-item'>
          <div className="flyout-friend-body">
            No friend requests.
          </div>
        </li>
      </div>);
    }

    return (<div className="friends-flyout">
      <div className="flyout-header">
        Friend Requests
      </div>
      <div className="flyout-list">

       {this.props.friendRequests.map((el) => {
        return(
          <li className='flyout-list-item' key={el.id}>
            <img className="user-pic-flyout" src={el.avatar}/>
            <div className="flyout-friend-body">
              <div className="flyout-friend-name">{el.fullName}</div>
              <div className="flyout-item-buttons">
                <div className="flyout-confirm" onClick={() => this.props.respondToFriendRequest({type:'accept', target_id: el.id})}>Confirm</div>
                <div className="flyout-delete" onClick={() => this.props.respondToFriendRequest({type:'reject', target_id: el.id})}>Delete Request</div>
              </div>
            </div>
          </li>
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
    this.props.logout().then(() => {
    this.props.router.push('/signup');
  });
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

            <Search pos='navbar'/>

          </div>
          <div className="nav-right-side">
            <div className="nav-link-profile"><img className="user-pic-header" src={currentUser.avatarHeader}/>
            <Link to={`profile/${currentUser.id}`}>{currentUser.fname}</Link>
          </div>
            <div className="nav-link-home"><Link to="/newsfeed">Home</Link></div>
            <div className="notifications-bar">
              <div><i className="fa fa-users notification" aria-hidden="true" onClick={this.clickFriendNotificationButton}>
                {this.props.friends.notificationCount > 0 ? <div className="small-notification-count">{this.props.friends.notificationCount}</div> : null}
              </i></div>
              <div><i className="fa fa-comments notification" aria-hidden="true" onClick={this.clickMessageNotificationButton}>
                {this.props.messages.numUnseenChats > 0 ? <div className="small-notification-count">{this.props.messages.numUnseenChats}</div> : null}
              </i></div>




                { this.renderMessages() }
                { this.renderNotifications() }
                { this.renderFriends() }




              <div><i className="fa fa-globe notification" aria-hidden="true" onClick={this.clickNotificationButton}>
                  {this.props.notifications.count > 0 ? <div className="small-notification-count">{this.props.notifications.count}</div> : null}
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

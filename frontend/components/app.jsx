import React from 'react';
import NavBar from './nav_bar/nav_bar';
import { connect } from 'react-redux';
import Home from './home/home';
import { fetchFriendsRequest } from '../actions/friend_actions';

const mapDispatchToProps = (dispatch) => ({
  fetchFriendsRequest: () => dispatch(fetchFriendsRequest())
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsRequest();
  }

  componentWillReceiveProps() {
    this.props.fetchFriendsRequest();
  }


  render() {
    return(
      <div>
        <NavBar />
        {this.props.children}
        <div className="chat-container">
          <div className="chat-header">John Smith</div>
          <div className="chat-body">

            <div className="chat-message-other">
              <img className="user-pic-xxs" />
              <div className="message-other"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-self">
              <div className="message-self"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-self">
              <div className="message-self"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-other">
              <img className="user-pic-xxs" />
              <div className="message-other"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-self">
              <div className="message-self"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-other">
              <img className="user-pic-xxs" />
              <div className="message-other"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-self">
              <div className="message-self"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
            <div className="chat-message-other">
              <img className="user-pic-xxs" />
              <div className="message-other"> ajsdijas diosajdoiasjdioasjd ioasjdaisoj dioasjdoiasjioasjd asj dasoij saijdoijas oidjasioj</div>
            </div>
        </div>

        <div className="chat-input">
          <form className="chat-input-form">
            <input type="text" className="chat-input-input" placeholder="Type a message..."></input>
          </form>
        </div>

        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);

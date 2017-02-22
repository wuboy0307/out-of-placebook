import React from 'react';
import NavBar from './nav_bar/nav_bar';
import { connect } from 'react-redux';
import Home from './home/home';
import Chatbox from './chat/chatbox';
import ClickListener from './flyout/click_listener';
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
        <Chatbox />
        <ClickListener />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);

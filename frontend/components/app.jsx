import React from 'react';
import NavBar from './nav_bar/nav_bar';
import { connect } from 'react-redux';
import Home from './home/home';
import Chatbox from './chat/chatbox';
import Modal from './modal/modal';
import ClickListener from './flyout/click_listener';
import { fetchFriendsRequest } from '../actions/friend_actions';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  fetchFriendsRequest: () => dispatch(fetchFriendsRequest())
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFriendsRequest();
  }


  render() {
    if (!this.props.currentUser) {
      return null;
    }

    return(
      <div>
        <Modal />

        <NavBar />

        {this.props.children}

        <Chatbox />
        <ClickListener />
      </div>
    );
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

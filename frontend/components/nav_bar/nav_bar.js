import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSearchResultsRequest } from '../../actions/search_actions';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearchResultsRequest: (query) => dispatch(fetchSearchResultsRequest(query))
});

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.clickNotificationButton = this.clickNotificationButton.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.state = {
      flyoutVisible: false,
      search: ''
    };
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

  performSearch(e) {
    this.setState({search: e.target.value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // doesnt search if query is empty
      if (this.state.search.length > 0) {
        this.props.fetchSearchResultsRequest({query: this.state.search});
      }
    }, 1000);
  }

  render() {
    const currentUser = this.props.currentUser;
    return(
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-left-side">
            <div className="small-logo">O</div>
            <form className="search-form" onClick={() => this.searchInput.focus()}>
              <div className="search-form-input">
                <input type="text" placeholder="search" onChange={this.performSearch}
                  ref={(input) => { this.searchInput = input; }} />
              </div>
              <button type="button">Search</button>
            </form>

            <div className="search-dropdown">

            </div>

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

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import {selectSearchResults, selectChatSearchResults} from '../../reducers/selectors';
import { fetchSearchResultsRequest, fetchChatSearchResultsRequest } from '../../actions/search_actions';

const mapStateToProps = (state) => ({
  search: selectSearchResults(state),
  chatSearch: selectChatSearchResults(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearchResultsRequest: (query) => dispatch(fetchSearchResultsRequest(query)),
  fetchChatSearchResultsRequest: (query) => dispatch(fetchChatSearchResultsRequest(query))
});

class Search extends React.Component {
  constructor(props){
    super(props);
    this.performSearch = this.performSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.chatboxResults = this.chatboxResults.bind(this);

    this.state = {
      search: ''
    };
  }

  componentWillReceiveProps(newProps){
    if (newProps.params !== this.props.params) {
      this.setState({search: ''});
    }
  }

  performSearch(e) {
    this.setState({search: e.target.value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // doesnt search if query is empty
      if (this.state.search.length > 0) {
        if (this.props.pos === 'navbar') {
          this.props.fetchSearchResultsRequest({query: this.state.search});
        } else if (this.props.pos === 'chatbox') {
          this.props.fetchChatSearchResultsRequest({query: this.state.search});
        }
      }
    }, 300);
  }

  renderMutualFriends(num) {
    if (num < 1) {
      return null;
    } else if (num < 2) {
      return `${num} mutual friend`;
    } else {
      return `${num} mutual friends`;
    }
  }

  renderResults() {
    if (this.state.search.length < 1) return null;
    let searchResults;
    let resultType;
    if (this.props.pos === 'navbar') {
      searchResults = this.props.search;
      resultType = '';
    } else if (this.props.pos === 'chatbox') {
      searchResults = this.props.chatSearch;
      resultType = 'chatbox-search';
    }

    if (searchResults.length < 1) {
      return(
        <div className={`${resultType} search-dropdown`}>
            <div className="search-result">
                <div className="search-no-results">No results</div>
            </div>

        </div>
      );
    }

    if (this.props.pos === 'chatbox') {
      return this.chatboxResults();
    }

    return(
      <div className={`${resultType} search-dropdown`}>
        {searchResults.map((user) => (
            <div key={user.id}>
              <Link to={`/profile/${user.id}`} className="search-result" >
              <div className="search-result-pic">
                <img className="user-pic-xs" src={user.avatarUrl} />
              </div>
              <div className="search-result-body">
                <div className="search-result-name">
                  {user.fullName}
                </div>
                <div className="search-result-friends">
                  { this.renderMutualFriends(user.mutualFriends) }
                </div>
              </div>
            </Link>
            </div>
        ))}
      </div>
    );
  }

  chatboxResults() {
    return(
    <div className='search-dropdown chatbox-search'>
      {this.props.chatSearch.map((user) => (
          <div key={user.id} className='search-result'>
            <div className="search-result-pic">
              <img className="user-pic-xxxs" src={user.avatarUrl} />
            </div>
            <div className="search-result-body">
              <div className="search-result-name">
                {user.fullName}
              </div>
              <div className="search-result-friends">
                { this.renderMutualFriends(user.mutualFriends) }
              </div>
            </div>
          </div>
      ))}
    </div>
    );
  }

  render() {

    return(
      <form className="search-form" onClick={() => this.searchInput.focus()}>
        <div className="search-form-input">
          <input type="text"
            placeholder={this.props.pos === 'navbar' ? 'search' : 'Add people to this chat'}
            onChange={this.performSearch}
            ref={(input) => { this.searchInput = input; }} value={this.state.search}/>
        </div>
        <button type="button">Search</button>

          { this.renderResults() }

      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Search));

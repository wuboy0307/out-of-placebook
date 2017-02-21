import React from 'react';
import { connect } from 'react-redux';
import {selectSearchResults} from '../../reducers/selectors';
import { fetchSearchResultsRequest } from '../../actions/search_actions';

const mapStateToProps = (state) => ({
  search: selectSearchResults(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearchResultsRequest: (query) => dispatch(fetchSearchResultsRequest(query))
});

class Search extends React.Component {
  constructor(props){
    super(props);
    this.performSearch = this.performSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.state = {
      search: ''
    };
  }


  performSearch(e) {
    this.setState({search: e.target.value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // doesnt search if query is empty
      if (this.state.search.length > 0) {
        this.props.fetchSearchResultsRequest({query: this.state.search});
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

    if (this.props.search.length < 1) {
      return(
        <div className="search-dropdown">
            <div className="search-result">
                <div className="search-no-results">No results</div>
            </div>

        </div>
      );
    }
    return(
      <div className="search-dropdown">
        {this.props.search.map((user) => (
          <div className="search-result" key={user.id}>
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
          </div>
        ))}

      </div>
    );
  }

  render() {

    return(
      <form className="search-form" onClick={() => this.searchInput.focus()}>
        <div className="search-form-input">
          <input type="text" placeholder="search" onChange={this.performSearch}
            ref={(input) => { this.searchInput = input; }} />
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
)(Search);

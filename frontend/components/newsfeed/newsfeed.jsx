import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../post/post_item';
import { selectPosts } from '../../reducers/selectors';
import { fetchNewsfeedRequest } from '../../actions/newsfeed_actions';

const mapStateToProps = (state) => ({
  posts: selectPosts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsfeedRequest: () => dispatch(fetchNewsfeedRequest())
});

class NewsFeed extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchNewsfeedRequest(this.props.params.profileId);
  }

  render(){
    if (!this.props.posts) {
      return null;
    }

    return(
      <div className="home">
        <div className="newsfeed-container">
          { this.props.posts.map(post => <PostItem key={post.id} post={post} />)}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeed);

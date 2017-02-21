import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../post/post_item';

const mapStateToProps = (state) => ({
  posts: selectPosts(state)
});

class NewsFeed extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

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
  null
)(NewsFeed);

import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../post/post_item';
import { fetchSinglePostRequest } from '../../actions/post_actions';
import { fetchNotificationCountRequest }
  from '../../actions/notification_actions';
import { selectPosts } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  posts: selectPosts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationCountRequest: () =>
    dispatch(fetchNotificationCountRequest()),
  fetchSinglePostRequest: (postId) => dispatch(fetchSinglePostRequest(postId))
});


class SinglePost extends React.Component {
  constructor(props){
    super(props);
  }


  componentWillReceiveProps(newProps) {
    if (this.props.params.postId !== newProps.params.postId) {
      this.props.fetchSinglePostRequest(newProps.params.postId);
    }
  }


  componentDidMount() {
    this.props.fetchSinglePostRequest(this.props.params.postId);
  }

  render(){
    if (!this.props.posts) return null;
    return(
      <div className="home">
      <div className='single-post-container'>
        { this.props.posts.map(post => <PostItem key={post.id} post={post} />)}
      </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);

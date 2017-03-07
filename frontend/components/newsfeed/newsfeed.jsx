import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../post/post_item';
import { selectPosts, selectFriends } from '../../reducers/selectors';
import { fetchNewsfeedRequest, fetchNewsfeedUpdateRequest, deletePostUpdateSuccess } from '../../actions/newsfeed_actions';

const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  friends: selectFriends(state),
  currentUserId: state.auth.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsfeedRequest: () => dispatch(fetchNewsfeedRequest()),
  fetchNewsfeedUpdateRequest: (postId) => dispatch(fetchNewsfeedUpdateRequest(postId)),
  deletePostUpdateSuccess: (postId) => dispatch(deletePostUpdateSuccess(postId))
});

class NewsFeed extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchNewsfeedRequest(this.props.params.profileId);

    this.pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });
    // Pusher.logToConsole = true;
    this.channel = this.pusher.subscribe(`newsfeed`);
    this.channel.bind('newsfeed-activity', (info) => {

      if (!this.props.friends.includes(info.wall_id) && info.wall_id != this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.fetchNewsfeedUpdateRequest(info.post_id);
    });

    this.channel.bind('newsfeed-delete-activity', (info) => {
      if (!this.props.friends.includes(info.wall_id)) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.deletePostUpdateSuccess(info.post_id);
    });
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

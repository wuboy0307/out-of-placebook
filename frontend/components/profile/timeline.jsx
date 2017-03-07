import React from 'react';
import TimelineSideBar from './timeline_side_bar';
import CreatePost from '../post/create_post';
import PostItem from '../post/post_item';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectPosts, selectFriends } from '../../reducers/selectors';
import { fetchSingleProfileRequest } from '../../actions/profile_actions';
import { fetchWallUpdate, deletePostUpdateSuccess } from '../../actions/post_actions';


const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  sharedPosts: state.posts.sharedPosts,
  currentUserId: state.auth.currentUser.id,
  friends: selectFriends(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWallUpdate: (postId) => dispatch(fetchWallUpdate(postId)),
  deletePostUpdateSuccess: (postId) => dispatch(deletePostUpdateSuccess(postId)),
  fetchSingleProfileRequest: (postId) => dispatch(fetchSingleProfileRequest(postId))
});


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.renderTimelineMain = this.renderTimelineMain.bind(this);
  }

  componentDidMount(){
    this.pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });
    // Pusher.logToConsole = true;
    this.channel = this.pusher.subscribe(`wall-notifications-${this.props.params.profileId}`);
    this.channel.bind('activity', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.fetchWallUpdate(id.id);
    });
    this.channel.bind('delete-post', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.deletePostUpdateSuccess(id.id);
    });
    this.channel.bind('profile-update', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.fetchSingleProfileRequest(this.props.params.profileId);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.profileId === this.props.params.profileId) return null;

    if (!this.pusher) return null;
    this.pusher.unsubscribe(`wall-notifications-${prevProps.params.profileId}`);

    this.channel = this.pusher.subscribe(`wall-notifications-${this.props.params.profileId}`);

    this.channel.bind('activity', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.fetchWallUpdate(id.id);
    });
    this.channel.bind('delete-post', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.deletePostUpdateSuccess(id.id);
    });
    this.channel.bind('profile-update', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');
      this.props.fetchSingleProfileRequest(this.props.params.profileId);
    });
  }

  renderTimelineMain() {
    if (!this.props.friends) return null
    if (this.props.currentUserId != parseInt(this.props.params.profileId) && !this.props.friends.includes(parseInt(this.props.params.profileId))) return null
    return(
      <div className="timeline-main">
        <CreatePost profileId={this.props.params.profileId}/>
        { this.props.posts.map(post => <PostItem key={post.id} post={post} />)}
      </div>
    );
  }


  render () {

    return(
      <div className="timeline">
          <TimelineSideBar />
          { this.renderTimelineMain() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Timeline));

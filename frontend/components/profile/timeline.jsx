import React from 'react';
import TimelineSideBar from './timeline_side_bar';
import CreatePost from '../post/create_post';
import PostItem from '../post/post_item';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectPosts } from '../../reducers/selectors';
import { fetchSingleProfileRequest } from '../../actions/profile_actions';
import { fetchWallUpdate } from '../../actions/post_actions';


const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  sharedPosts: state.posts.sharedPosts,
  currentUserId: state.auth.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  fetchWallUpdate: (postId) => dispatch(fetchWallUpdate(postId))
});


class Timeline extends React.Component {

  componentDidMount(){
    this.pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });
    Pusher.logToConsole = true;
    this.channel = this.pusher.subscribe(`wall-notifications-${this.props.params.profileId}`);
    this.channel.bind('activity', (id) => {
      if (id.sender === this.props.currentUserId) return null
      console.log('NOT SENT FROM CURRENT USER');

      this.props.fetchWallUpdate(id.id);
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
  }


  render () {

    return(
      <div className="timeline">
          <TimelineSideBar />
          <div className="timeline-main">
            <CreatePost profileId={this.props.params.profileId}/>
            { this.props.posts.map(post => <PostItem key={post.id} post={post} />)}
          </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Timeline));

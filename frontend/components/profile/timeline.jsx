import React from 'react';
import TimelineSideBar from './timeline_side_bar';
import CreatePost from '../post/create_post';
import PostItem from '../post/post_item';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  posts: state.posts,
  profileList: state.profiles.profileList
});

class Timeline extends React.Component {

  render () {
    return(
      <div className="timeline">
          <TimelineSideBar />
          <div className="timeline-main">
            <CreatePost />
            { this.props.posts.map(post => <PostItem key={post.id} post={post} profile={this.props.profileList[this.props.params.profileId]}/>)}
          </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(Timeline));

import React from 'react';
import TimelineSideBar from './timeline_side_bar';
import CreatePost from '../post/create_post';
import PostItem from '../post/post_item';

class Timeline extends React.Component {
  render () {
    return(
      <div className="timeline">
          <TimelineSideBar />
          <div className="timeline-main">
            <CreatePost />
            <PostItem />
            <PostItem />
          </div>
      </div>
    );
  }
}

export default Timeline;
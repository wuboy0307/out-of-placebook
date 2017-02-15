import React from 'react';
import TimelineSideBar from './timeline_side_bar';
import CreatePost from '../post/create_post';

class Timeline extends React.Component {
  render () {
    return(
      <div className="timeline">
          <TimelineSideBar />
          <div className="timeline-main">
            <CreatePost />
          </div>
      </div>
    );
  }
}

export default Timeline;

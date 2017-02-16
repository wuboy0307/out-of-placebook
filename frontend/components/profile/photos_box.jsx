import React from 'react';

class PhotosBox extends React.Component {
  render() {
    return (
      <div className="timeline-side-bar-item">
        <div className="timeline-side-bar-header">
          <i className="fa fa-camera fa-2x" aria-hidden="true"></i><span>Photos</span>
        </div>
        <div className="timeline-photos-container">
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
          <img className="timeline-side-bar-photo" />
        </div>
      </div>
    );
  }
}

export default PhotosBox;

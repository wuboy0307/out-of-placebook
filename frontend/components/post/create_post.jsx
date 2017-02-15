import React from 'react';

class CreatePost extends React.Component {
  render () {
    return(
      <div className="create-post">
        <div className="create-post-header">
          <div className="create-post-header-item">Status</div>
          <div className="create-post-header-item">Photo</div>
          <div className="create-post-header-item">Video</div>
        </div>
        <div className="create-post-main">
          <div className="create-post-img-wrapper">
            <img src="" className="user-pic-xs" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;

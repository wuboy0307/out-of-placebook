import React from 'react';

class PostItem extends React.Component {
  render () {
    return(
      <div className="post-item">

        <div className="post-item-header">
          <div className="post-item-img-wrapper">
            <img src="" className="user-pic-xs" />
          </div>

          <div className="post-item-header-data">
            <div className="post-item-user-data">
              <span className="post-item-user-1">Bill Gates</span> > <span className="post-item-user-2">Mark Zuckerberg</span>
            </div>
            <div className="post-item-time-data">
              20 hrs
            </div>
          </div>
        </div>

        <div className="post-item-body">
          <p>Yo whaddup dude??</p>
        </div>

        <div className="post-item-content">

        </div>

        <div className="post-item-footer">
          <div className="post-action-container">
            <div className="post-action">Like</div>
            <div className="post-action">Comment</div>
            <div className="post-action">Share</div>
          </div>
        </div>

      </div>
    );
  }
}

export default PostItem;

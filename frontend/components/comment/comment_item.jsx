import React from 'react';

class CommentItem extends React.Component {

  render() {
    return(
      <div className="comment-item">
        <img className="user-pic-xxs" />
        <div className="comment-body">
          <div className="comment-data"><span className="comment-user-name">Mark Zuckerberg</span>I love FB love FB love FB love FB love FB love FB love FB love FB love FB love FB love FB love FB
           love FB love FB love FB love FB love FB love FB love FB love FB love FB love FB love FB
          love FB love FB love FB love FB love FB love FB love FB</div>
          <div className="comment-actions">Like Reply Timestamp</div>
        </div>
      </div>
    );
  }
}

export default CommentItem;

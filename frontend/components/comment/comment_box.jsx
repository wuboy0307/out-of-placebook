import React from 'react';
import CommentItem from './comment_item';

class CommentBox extends React.Component {

  render() {
    return(
      <div className="comment-box">
        <div className="comment-box-activity">
          5 people like this.
        </div>
        { this.props.comments.map(comment => <CommentItem key={comment.id} parentComment={comment} />)}
      </div>
    );
  }
}

export default CommentBox;

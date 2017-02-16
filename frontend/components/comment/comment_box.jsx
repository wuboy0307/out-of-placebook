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

        <div className="comment-reply">
          <div className="comment-reply-body">
            <img className="user-pic-xxs" />
            <form className="comment-reply-form">
              <input type="text" className="comment-reply-input" placeholder="Write a comment..." />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;

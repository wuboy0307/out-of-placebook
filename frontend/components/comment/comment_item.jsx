import React from 'react';

class CommentInCommentItem extends React.Component {

  render() {
    return(
      <div className="comment-in-comment-item">
        <div className="comment-comment-container">
          <img className="user-pic-xxxs" />
          <div className="comment-body">
            <div className="comment-data"><span className="comment-user-name">{this.props.childComment.authorFullName}</span>
              {this.props.childComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action">Like</div>
              <div className="comment-action">Reply</div>
              <div className="comment-timestamp">Timestamp</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CommentItem extends React.Component {

  render() {
    return(
      <div className="comment-item-border">
        <div className="comment-item">

          <img className="user-pic-xxs" />
          <div className="comment-body">
            <div className="comment-data"><span className="comment-user-name">{this.props.parentComment.authorFullName}</span>
              {this.props.parentComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action">Like</div>
              <div className="comment-action">Reply</div>
              <div className="comment-timestamp">Timestamp</div>
            </div>
          </div>
        </div>

        { this.props.parentComment.childComments.map(child => (<CommentInCommentItem key={child.id} childComment={child}/>))}
      </div>
    );
  }
}


export default CommentItem;

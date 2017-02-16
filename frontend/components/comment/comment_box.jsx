import React from 'react';
import CommentItem from './comment_item';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUserAvatarUrl: state.auth.currentUser.avatar_url
});

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.renderLikes = this.renderLikes.bind(this);
  }

  renderLikes() {
    const numLikes = this.props.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-box-activity">
          {this.props.likeText}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return(
      <div className="comment-box">
        { this.renderLikes() }

        { this.props.comments.map(comment => <CommentItem key={comment.id} parentComment={comment} />)}

        <div className="comment-reply">
          <div className="comment-reply-body">
            <img className="user-pic-xxs" src={this.props.currentUserAvatarUrl} />
            <form className="comment-reply-form">
              <input type="text" className="comment-reply-input" placeholder="Write a comment..." />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(CommentBox);

import React from 'react';

class CommentInCommentItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLikesComment: this.props.childComment.userLikesComment,
      numLikes: this.props.childComment.numLikes
    };
    this.renderLikes = this.renderLikes.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(){
    const userLikes = this.state.userLikesComment;
    if (userLikes) {
      this.setState({
        userLikesComment: !userLikes,
        numLikes: this.state.numLikes - 1
      });
    } else {
      this.setState({
        userLikesComment: !userLikes,
        numLikes: this.state.numLikes + 1
      });
    }
  }

  renderLikes() {
    const numLikes = this.state.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-action">Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action">Reply</div>
      );
    }
  }


  render() {
    return(
      <div className="comment-in-comment-item">
        <div className="comment-comment-container">
          <img className="user-pic-xxxs" src={this.props.childComment.authorAvatarUrl}/>
          <div className="comment-body">
            <div className="comment-data"><span className="comment-user-name">{this.props.childComment.authorFullName}</span>
              {this.props.childComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action" onClick={this.toggleLike}>{this.state.userLikesComment ? 'Unlike' : 'Like'}</div>
              { this.renderLikes() }
              <div className="comment-timestamp">{this.props.childComment.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CommentItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLikesComment: this.props.parentComment.userLikesComment,
      numLikes: this.props.parentComment.numLikes
    };
    this.renderLikes = this.renderLikes.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(){
    const userLikes = this.state.userLikesComment;
    if (userLikes) {
      this.setState({
        userLikesComment: !userLikes,
        numLikes: this.state.numLikes - 1
      });
    } else {
      this.setState({
        userLikesComment: !userLikes,
        numLikes: this.state.numLikes + 1
      });
    }
  }

  renderLikes() {
    const numLikes = this.state.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-action">Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action">Reply</div>
      );
    }
  }

  render() {
    return(
      <div className="comment-item-border">
        <div className="comment-item">

          <img className="user-pic-xxs" src={this.props.parentComment.authorAvatarUrl}/>
          <div className="comment-body">
            <div className="comment-data"><span className="comment-user-name">{this.props.parentComment.authorFullName}</span>
              {this.props.parentComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action" onClick={this.toggleLike}>{this.state.userLikesComment ? 'Unlike' : 'Like'}</div>
              { this.renderLikes() }
              <div className="comment-timestamp">{this.props.parentComment.createdAt}</div>
            </div>
          </div>
        </div>

        { this.props.parentComment.childComments.map(child => (<CommentInCommentItem key={child.id} childComment={child}/>))}
      </div>
    );
  }
}


export default CommentItem;

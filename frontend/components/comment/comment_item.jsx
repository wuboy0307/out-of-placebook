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
    this.bindUserToListener = this.bindUserToListener.bind(this);

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

  bindUserToListener(username) {
    return () => this.props.listener(username);
  }

  renderLikes() {
    const numLikes = this.state.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-action" onClick={this.bindUserToListener(this.props.childComment.authorFullName)}>Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action" onClick={this.props.listener}>Reply</div>
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
      numLikes: this.props.parentComment.numLikes,
      commentReply: false
    };
    this.renderLikes = this.renderLikes.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.commentReplyListener = this.commentReplyListener.bind(this);
    this.renderCommentComment = this.renderCommentComment.bind(this);
    this.bindUserToListener = this.bindUserToListener.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.commentReply) {
      this.nameInput.focus();
    }
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
        <div className="comment-action" onClick={this.bindUserToListener('')}>Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action">Reply</div>
      );
    }
  }

  handleInput(e) {
    this.setState({replyToUser: e.target.value});
  }

  renderCommentComment() {
    if (this.state.commentReply) {
        return(
          <div className="comment-in-comment-item">
          <div className="comment-comment-box">
            <div className="comment-reply">
              <div className="comment-comment-reply-body">
                <img className="user-pic-xxxs" src={this.props.currentUserAvatarUrl} />
                <form className="comment-reply-form">
                  <input type="text" className="comment-reply-input"
                    ref={(input) => { this.nameInput = input; }}
                    placeholder="Write a comment..." onChange={this.handleInput} value={this.state.replyToUser}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  bindUserToListener(username) {
    return () => this.commentReplyListener(username);
  }

  commentReplyListener(user){
    this.setState({
      commentReply: true,
      replyToUser: user ? `${user} ` : ''
    });
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

        { this.props.parentComment.childComments.map(child => (<CommentInCommentItem key={child.id} childComment={child} listener={this.commentReplyListener}/>))}

        { this.renderCommentComment() }
      </div>
    );
  }
}


export default CommentItem;

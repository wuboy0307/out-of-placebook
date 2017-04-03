import React from 'react';
import { connect } from 'react-redux';
import { createSingleCommentRequest, createSingleLikeRequest, destroySingleLikeRequest } from '../../actions/post_actions';
import { selectComments } from '../../reducers/selectors';
import { Link } from 'react-router';

class CommentInCommentItem extends React.Component {
  constructor(props){
    super(props);
    this.renderLikes = this.renderLikes.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.bindUserToListener = this.bindUserToListener.bind(this);
  }

  toggleLike(){
    const likeInfo = {
      type: 'comment',
      content_id: this.props.childComment.id
    };
    this.props.childComment.userLikesComment ?
      this.props.destroySingleLikeRequest(likeInfo) :
      this.props.createSingleLikeRequest(likeInfo);
  }

  bindUserToListener(username) {
    return () => this.props.listener(username);
  }

  renderLikes() {
    const numLikes = this.props.childComment.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-action"
            onClick={this.bindUserToListener(
              this.props.childComment.authorFullName
            )}>
          Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action"
          onClick={this.bindUserToListener(
            this.props.childComment.authorFullName
          )}>Reply</div>
      );
    }
  }


  render() {
    return(
      <div className="comment-in-comment-item">
        <div className="comment-comment-container">
          <img className="user-pic-xxxs"
            src={this.props.childComment.authorAvatarUrl} />
          <div className="comment-body">
            <div className="comment-data">
              <Link to={`/profile/${this.props.childComment.authorId}`}>
                <span className="comment-user-name">
                  {this.props.childComment.authorFullName}
                </span>
              </Link>
              {this.props.childComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action"
                onClick={this.toggleLike}>
                {this.props.childComment.userLikesComment ? 'Unlike' :
                  'Like'}
              </div>

              { this.renderLikes() }

              <div
                className="comment-timestamp">
                {this.props.childComment.createdAt}
              </div>
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
      commentReply: false
    };
    this.renderLikes = this.renderLikes.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.commentReplyListener = this.commentReplyListener.bind(this);
    this.renderCommentComment = this.renderCommentComment.bind(this);
    this.bindUserToListener = this.bindUserToListener.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.commentReply !== prevState.commentReply) {
      this.nameInput.focus();
    }
  }

  toggleLike(){
    if (this.props.parentComment.userLikesComment) {
      const likeInfo = {
        type: 'comment',
        content_id: this.props.parentComment.id
      };

      this.props.destroySingleLikeRequest(likeInfo);

    } else {

      const likeInfo = {
        type: 'comment',
        content_id: this.props.parentComment.id
      };

      this.props.createSingleLikeRequest(likeInfo);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let comment = {
      post_id: this.props.postId,
      body: this.state.replyToUser,
      parent_id: this.props.parentComment.id
    };
    this.props.createSingleCommentRequest(comment).then(() => this.setState({replyToUser: ''}));
  }

  renderLikes() {
    const numLikes = this.props.parentComment.numLikes;
    if (numLikes > 0) {
      return(
        <div className="comment-action" onClick={this.bindUserToListener('')}>Reply
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> {numLikes}
        </div>
        );
    } else {
      return(
        <div className="comment-action" onClick={this.bindUserToListener('')}>Reply</div>
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
                <img className="user-pic-xxxs" src={this.props.currentUser.avatarXXXS || `/assets/avatar.jpg` } />
                <form className="comment-reply-form" onSubmit={this.handleSubmit}>
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

          <img className="user-pic-xxs" src={this.props.parentComment.authorAvatarUrl || `/assets/avatar.jpg`}/>
          <div className="comment-body">
            <div className="comment-data">
              <Link to={`/profile/${this.props.parentComment.authorId}`}>
                <span className="comment-user-name">{this.props.parentComment.authorFullName}</span>
              </Link>
              {this.props.parentComment.body}
            </div>
            <div className="comment-actions">
              <div className="comment-action" onClick={this.toggleLike}>{this.props.parentComment.userLikesComment ? 'Unlike' : 'Like'}</div>
              { this.renderLikes() }
              <div className="comment-timestamp">{this.props.parentComment.createdAt}</div>
            </div>
          </div>
        </div>

        { selectComments(this.props.parentComment.childComments).map(child => (
          <CommentInCommentItem key={child.id}
            childComment={child}
            listener={this.commentReplyListener}
            destroySingleLikeRequest={this.props.destroySingleLikeRequest}
            createSingleLikeRequest={this.props.createSingleLikeRequest} />
        ))}

        { this.renderCommentComment() }
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createSingleCommentRequest: (comment) => dispatch(createSingleCommentRequest(comment)),
  createSingleLikeRequest: (likeInfo) => dispatch(createSingleLikeRequest(likeInfo)),
  destroySingleLikeRequest: (likeInfo) => dispatch(destroySingleLikeRequest(likeInfo))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);

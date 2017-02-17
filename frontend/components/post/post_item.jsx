import React from 'react';
import CommentBox from '../comment/comment_box';
import { Link } from 'react-router';
import { selectComments } from '../../reducers/selectors';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderPostUser = this.renderPostUser.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderUrlContent = this.renderUrlContent.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.selectCommentBox = this.selectCommentBox.bind(this);
    // this.renderComments = this.renderComments.bind(this);
    this.state = {
      numLikes: this.props.post.numLikes,
      currentUserLikes: this.props.post.userLikesPost,
      selected: false
    };
  }

  renderContent() {
    const post = this.props.post;
    if (!post.content) {
      return null;
    }
    if (post.contentType === 'url') {
      return this.renderUrlContent();
    }
  }

  renderUrlContent() {
    const content = this.props.post.content;
    return(
      <a href={content.url}>
      <div className="post-item-url">
          <img className="post-item-url-photo" src={content.image}/>
          <div className="post-item-url-text">
            <div className="post-item-url-title">{content.title}</div>
            <div className="post-item-url-description">{content.description}</div>
            <div className="post-item-url-url">{content.url}</div>
          </div>
      </div>
    </a>
    );
  }

  renderPostUser() {
    if (this.props.post.wallId === this.props.post.authorId) {
      return(
        <div className="post-item-user-data">
          <Link to={`/profile/${this.props.post.authorId}`}>
            <span className="post-item-user-1">{this.props.post.authorFullName}</span>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="post-item-user-data">
          <Link to={`/profile/${this.props.post.authorId}`}>
            <span className="post-item-user-1">{this.props.post.authorFullName}</span>
          </Link>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
          <Link to={`/profile/${this.props.profile.id}`}>
            <span className="post-item-user-1">{`${this.props.profile.fname} ${this.props.profile.lname}`}</span>
          </Link>
        </div>
      );
    }
  }

  // NEED TO ADD APPROPRIATE AJAX CALLS FOR THIS
  toggleLike() {
    if (this.state.currentUserLikes) {
      this.setState({
        numLikes: this.state.numLikes - 1,
        currentUserLikes: !this.state.currentUserLikes
      });
    } else {
      this.setState({ numLikes: this.state.numLikes + 1,
      currentUserLikes: !this.state.currentUserLikes
    });
    }
  }

  selectCommentBox() {
    this.setState({selected: !this.state.selected});
  }

  render () {
    return(
      <div className="post-item-container">
        <div className="post-item">

          <div className="post-item-header">
            <div className="post-item-img-wrapper">
              <img src={this.props.post.authorAvatarUrl} className="user-pic-xs" />
            </div>

            <div className="post-item-header-data">

                { this.renderPostUser() }

              <div className="post-item-time-data">
                { this.props.post.createdAt }
              </div>
            </div>
          </div>

          <div className="post-item-body">
            <p> { this.props.post.body }</p>
          </div>

          <div className="post-item-content">
            { this.renderContent() }
          </div>

          <div className="post-item-footer">
            <div className="post-action-container">
              <div className={`like-action ${this.state.currentUserLikes}`} onClick={this.toggleLike}>Like</div>
              <div className="post-action" onClick={this.selectCommentBox}>Comment</div>
              <div className="post-action">Share</div>
            </div>
          </div>

        </div>

        <CommentBox comments={selectComments(this.props.post.comments)}
          numLikes={this.state.numLikes}
          currentUserLikes={this.state.currentUserLikes}
          likeText={this.props.post.likeText}
          selected={this.state.selected}
          postId={this.props.post.id} />

      </div>
    );
  }
}

export default PostItem;

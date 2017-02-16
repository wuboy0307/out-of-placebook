import React from 'react';
import CommentBox from '../comment/comment_box';
import { Link } from 'react-router';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderPostUser = this.renderPostUser.bind(this);
  }

  renderUrlContent() {
    return(
      <div className="post-item-url">
        <img className="post-item-url-photo" />
        <div className="post-item-url-text">
          <div className="post-item-url-title"></div>
          <div className="post-item-url-description"></div>
          <div className="post-item-url-url"></div>
        </div>
      </div>
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
           > <span className="post-item-user-1">{this.props.post.authorFullName}</span>
        </div>
      );
    }
  }

  render () {
    return(
      <div className="post-item-container">
        <div className="post-item">

          <div className="post-item-header">
            <div className="post-item-img-wrapper">
              <img src="" className="user-pic-xs" />
            </div>

            <div className="post-item-header-data">

                { this.renderPostUser() }

              <div className="post-item-time-data">
                { this.props.post.createdAt }
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


        <CommentBox />

      </div>
    );
  }
}

export default PostItem;

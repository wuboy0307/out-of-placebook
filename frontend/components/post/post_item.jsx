import React from 'react';
import CommentBox from '../comment/comment_box';
import { Link } from 'react-router';
import { selectComments } from '../../reducers/selectors';
import { connect } from 'react-redux';
import { createSingleLikeRequest, destroySingleLikeRequest, destroySinglePostRequest, editSinglePostRequest, fetchSingleSharedPostRequest } from '../../actions/post_actions';
import PostInPostItem from './post_in_post_item';
import { toggleFlyout } from '../../actions/flyout_actions';

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  sharedPosts: state.posts.sharedPosts
});

const mapDispatchToProps = dispatch => ({
  createSingleLikeRequest: (likeInfo) => dispatch(createSingleLikeRequest(likeInfo)),
  destroySingleLikeRequest: (likeInfo) => dispatch(destroySingleLikeRequest(likeInfo)),
  destroySinglePostRequest: (postId) => dispatch(destroySinglePostRequest(postId)),
  editSinglePostRequest: (postInfo) => dispatch(editSinglePostRequest(postInfo)),
  fetchSingleSharedPostRequest: (postInfo) => dispatch(fetchSingleSharedPostRequest(postInfo)),
  toggleFlyout: (flyoutType, data) => dispatch(toggleFlyout(flyoutType, data))
});

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderPostUser = this.renderPostUser.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderUrlContent = this.renderUrlContent.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.selectCommentBox = this.selectCommentBox.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.renderPostDescription = this.renderPostDescription.bind(this);
    this.editFormSubmit = this.editFormSubmit.bind(this);
    this.renderSharedPost = this.renderSharedPost.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.postOrContent = this.postOrContent.bind(this);

    this.state = {
      selected: false,
      dropdownVisible: false,
      editPost: false,
      postBody: this.props.post.body
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sharedPosts !== this.props.sharedPosts) {
      this.render.bind(this)();
    }
  }

  componentDidMount() {
    const post = this.props.post;
    if (post.contentType === 'post' && !post.content.id) {
      if (!this.props.sharedPosts[post.content.id]) {
      this.props.fetchSingleSharedPostRequest(post.content.id);
    };
  }
}

  renderContent() {
    const post = this.props.post;
    if (!post.content) {
      return null;
    }
    if (post.contentType === 'url') {
      return this.renderUrlContent();
    }
    if (post.contentType === 'photo') {
      return (<img src={this.props.post.content.imageUrlTimeline} className="post-image"
        onClick={this.renderModal('photo', this.props.post.content.imageUrlOriginal)}/>);
    }
    if (post.contentType === 'post') {
      if (post.content.id) {
        return(<PostInPostItem post={post.content} />);
      } else {
      return(<PostInPostItem post={this.props.sharedPosts[post.content.id]} />);
      }
    }
      // return this.renderSharedPost();
    }


  renderSharedPost() {
    return(
      <PostInPostItem post={this.props.sharedPosts[this.props.post.content.id]} />
    );
  }

  renderUrlContent() {
    const content = this.props.post.content;
    return(
      <a href={content.url} target="_blank">
      <div className="post-item-url">
          <img className="post-item-url-photo" src={content.image}/>
          <div className="post-item-url-text">
            <div className="post-item-url-title">{content.title}</div>
            <div className="post-item-url-description">{content.description}</div>
            <div className="post-item-url-url">{content.domain_name}</div>
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
          <Link to={`/profile/${this.props.post.wallId}`}>
            <span className="post-item-user-1">{`${this.props.post.wallIdFullName}`}</span>
          </Link>
        </div>
      );
    }
  }

  toggleLike() {
    if (this.props.post.userLikesPost) {
      const likeInfo = {
        type: 'post',
        content_id: this.props.post.id
      };
      this.props.destroySingleLikeRequest(likeInfo);
    } else {
      const likeInfo = {
        type: 'post',
        content_id: this.props.post.id
      };
      this.props.createSingleLikeRequest(likeInfo);
    }
  }

  selectCommentBox() {
    this.setState({selected: !this.state.selected});
  }

  editFormSubmit(e) {
    e.preventDefault();
    const updatedPost = { id: this.props.post.id, body: this.state.postBody };
    this.props.editSinglePostRequest(updatedPost).then(() => this.setState({postBody: this.props.post.body, editPost: false}));
  }

  renderEditForm() {
    return(
      <form className="create-post-form" onSubmit={this.editFormSubmit}>
          <input autoFocus type="text" placeholder="Whats on your mind?" className='edit-post-input'
             value={this.state.postBody} onChange={(e) => this.setState({postBody: e.target.value})}/>
      </form>
    );
  }

  renderBody() {
    if (this.state.editPost) return this.renderEditForm();
    const body = this.props.post.body;
    if (this.props.post.contentType !== 'url') {
      return (
        <div className="post-item-body">
          <p>
            {body}
          </p>
        </div>
      );
    } else {
      const content = this.props.post.content;
      return (
        <div className="post-item-body">
          <p>
            {body.split(content.url)[0]} <a href={content.url} target="_blank">{content.url}</a> {body.split(content.url)[1]}
          </p>
        </div>
      );
    }
  }

  toggleDropdown() {
    this.setState({dropdownVisible: !this.state.dropdownVisible});
  }

  deletePost() {
    this.props.destroySinglePostRequest(this.props.post.id).then(() => this.setState({dropdownVisible: false}));
  }

  renderDropdown() {
    if (this.props.post.authorId !== this.props.currentUser.id) {
      return null;
    } else if (this.state.dropdownVisible) {
      return(
        <div className="post-item-dropdown-wrapper">
          <div className="post-item-dropdown-button"
            onClick={this.toggleDropdown}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </div>
            <div className="post-item-dropdown">
              <div className="post-item-dropdown-item" onClick={() => this.setState({editPost: true, dropdownVisible: false})}>Edit Post</div>
              <div className="post-item-dropdown-item" onClick={this.deletePost}>Delete Post</div>
            </div>
        </div>
        );
    } else {
      return(
        <div className="post-item-dropdown-wrapper">
          <div className="post-item-dropdown-button"
            onClick={this.toggleDropdown}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </div>
            </div>
        );
    }

  }

  renderPostDescription() {
    if (!this.props.post.postDescription) {
      return null;
    } else {
      return(
        <div className="post-description">
          {this.props.post.postDescription}
        </div>
      );
    }
  }

  postOrContent() {
    if (this.props.post.contentType === 'post') {
      return this.props.post.content;
    } else {
      return this.props.post
    }
  }

  renderModal(type, data) {
    return (e) => {
      e.stopPropagation();
      this.props.toggleFlyout('modal', {type, data});
    }
  }

  render () {
    // if (this.props.post.contentType === 'post' && !this.props.post.content.id && !this.props.sharedPosts[this.props.post.content.id]) return null;
    return(
      <div className="post-item-container">
        <div className="post-item">
          { this.renderPostDescription() }
          <div className="post-item-header">
            { this.renderDropdown() }
            <div className="post-item-img-wrapper">
              <img src={this.props.post.authorAvatarUrl || `/assets/avatar.jpg`} className="user-pic-xs" />
            </div>

            <div className="post-item-header-data">

                { this.renderPostUser() }

              <div className="post-item-time-data">
                { this.props.post.createdAt }
              </div>
            </div>
          </div>


            { this.renderBody() }


          <div className="post-item-content">

            { this.renderContent() }

          </div>

          <div className="post-item-footer">
            <div className="post-action-container">
              <div className={`like-action ${this.props.post.userLikesPost}`} onClick={this.toggleLike}>Like</div>
              <div className="post-action" onClick={this.selectCommentBox}>Comment</div>
              <div className="post-action" onClick={this.renderModal('sharepost', this.postOrContent())}>Share</div>
            </div>
          </div>

        </div>

        <CommentBox comments={selectComments(this.props.post.comments)}
          numLikes={this.props.post.numLikes}
          currentUserLikes={this.props.post.userLikesPost}
          likeText={this.props.post.likeText}
          selected={this.state.selected}
          postId={this.props.post.id} />

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);

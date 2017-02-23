import React from 'react';
import { connect } from 'react-redux';
import { createSinglePostRequest } from '../../actions/post_actions';
import PostItem2 from '../post/post_item2';
import { fetchSingleSharedPostRequest } from '../../actions/post_actions';
import { toggleFlyout } from '../../actions/flyout_actions';
import { withRouter } from 'react-router';

const mapDispatchToProps = dispatch => ({
  createSinglePostRequest: (postInfo) => dispatch(createSinglePostRequest(postInfo)),
  toggleFlyout: (flyoutInfo) => dispatch(toggleFlyout(flyoutInfo))
});

const mapStateToProps = (state) => ({
  currentUserAvatarUrl: state.auth.currentUser.avatar_url,
  friends: state.friends.friends,
  currentUserId: state.auth.currentUser.id,
  sharedPosts: state.posts.sharedPosts
});


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.renderSharedPost = this.renderSharedPost.bind(this);
    this.state = {
      postBody: '',
      bodyError: false
    };
  }

  componentDidMount(){
    // this.props.fetchSingleSharedPostRequest(121);
  }

  handleInput(e) {
    this.setState({postBody: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.postBody.length < 1) {
      this.setState({bodyError: true});
      return;
    }
    const postInfo = {
      wall_id: this.props.profileId ? this.props.profileId : this.props.currentUserId,
      body: this.state.postBody,
      content_id: this.props.sharedPost ? this.props.sharedPost.id : null
    };
    this.props.createSinglePostRequest(postInfo).then(() => {
      this.setState({bodyError: false, postBody: ''});
      if (this.props.sharedPost) {
        this.props.toggleFlyout(null);
        this.props.router.push(`/profile/${this.props.currentUserId}`);
      }
    });
  }

  renderForm(){
    return(
    <form className="create-post-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Whats on your mind?" className={`create-post-input-${this.state.bodyError}`}
          value={this.state.postBody} onChange={this.handleInput} />
    </form>
    );
  }

  renderSharedPost() {

    if (!this.props.sharedPost){
      return null;
    } else {
      return(<PostItem2 post={this.props.sharedPost}/>);
    }
  }

  // <PostItem2 post={this.props.sharedPosts[121]} />
  renderPost() {
    return(
      <div className="create-post">
        <div className="create-post-header">
          <div className="create-post-header-item">Status</div>
          <div className="create-post-header-item">Photo</div>
          <div className="create-post-header-item">Video</div>
        </div>
        { this.renderSharedPost() }

        <div className="create-post-main">
          <div className="create-post-img-wrapper">
            <img src={this.props.currentUserAvatarUrl || `/assets/avatar.jpg`} className="user-pic-xs" />
          </div>

          <div className="create-post-body">
            { this.renderForm()}
          </div>

        </div>




        <div className="create-post-footer">
          <button type="button" className="create-post-button" onClick={this.handleSubmit}>{ this.props.sharedPost ? 'Share' : 'Post'}</button>
        </div>

      </div>
    );

  return null;
  }

  render () {

    if (!this.props.profileId) return this.renderPost();
    if (!this.props.friends[this.props.profileId] && (this.props.profileId != this.props.currentUserId)) return null;
    return this.renderPost();

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePost));

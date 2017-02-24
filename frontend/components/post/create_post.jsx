import React from 'react';
import { connect } from 'react-redux';
import { createSinglePostRequest } from '../../actions/post_actions';
import PostItem2 from '../post/post_item2';
import { fetchSingleSharedPostRequest } from '../../actions/post_actions';
import { toggleFlyout } from '../../actions/flyout_actions';
import { withRouter } from 'react-router';

const mapDispatchToProps = dispatch => ({
  createSinglePostRequest: (formData) => dispatch(createSinglePostRequest(formData)),
  toggleFlyout: (flyoutInfo) => dispatch(toggleFlyout(flyoutInfo))
});

const mapStateToProps = (state) => ({
  currentUserAvatar: state.auth.currentUser.avatarXS,
  friends: state.friends.friends,
  currentUserId: state.auth.currentUser.id,
  sharedPosts: state.posts.sharedPosts,
  flyout: state.flyout.flyout
});


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.renderSharedPost = this.renderSharedPost.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.state = {
      postBody: '',
      bodyError: false,
      photo: false,
      image_file: null,
      image_preview_url: null
    };
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

    let formData = new FormData();
    formData.append("post[wall_id]", this.props.profileId ? this.props.profileId : this.props.currentUserId);
    formData.append("post[body]", this.state.postBody);
    formData.append("post[content_id]", this.props.sharedPost ? this.props.sharedPost.id : 0);
    formData.append("post[image]", this.state.image_file);
    // const postInfo = {
    //   wall_id: this.props.profileId ? this.props.profileId : this.props.currentUserId,
    //   body: this.state.postBody,
    //   content_id: this.props.sharedPost ? this.props.sharedPost.id : null,
    //   image: this.state.image_file
    // };
    this.props.createSinglePostRequest(formData).then(() => {
      this.setState({bodyError: false, postBody: '', image_file: null, image_preview_url: null});
      if (this.props.flyout === 'modal') {
        this.props.toggleFlyout(null);
        this.props.router.push(`/profile/${this.props.currentUserId}`);
      }
    });
  }

  updateFile(e) {
    let fileReader = new FileReader();
    let file = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({ image_file: file, image_preview_url: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
      this.setState({photo: false});
    }
   }

  renderForm(){
    if (this.state.photo) {
      return(
        <div className="create-post-photo" onClick={() => this.pictureInput.click()}>
          Upload Photo
          <form>
            <input type="file"
                id="file-input"
                onChange={this.updateFile} ref={(input) => this.pictureInput = input}/>
          </form>
        </div>
      );
    } else {
        const placeHolderText = this.state.image_preview_url ? 'Say something about this photo...' : "Whats on your mind?";
      return(
      <form className="create-post-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder={placeHolderText} className={`create-post-input-${this.state.bodyError}`}
            value={this.state.postBody} onChange={this.handleInput} />
      </form>
      );
    }
  }

  renderSharedPost() {

    if (!this.props.sharedPost){
      return null;
    } else {
      return(<PostItem2 post={this.props.sharedPost}/>);
    }
  }

  renderHeader() {
    if (!this.props.sharedPost){
    return(
      <div className="create-post-header">
        <div className="create-post-header-item" onClick={() => this.setState({photo: false})}><i className="fa fa-pencil" aria-hidden="true"></i>Status</div>
        <div className="create-post-header-item" onClick={() => this.setState({photo: true})}><i className="fa fa-camera" aria-hidden="true"></i>Photo</div>
      </div>
    );
  } else {
    return(
      <div className="create-post-header">
        <div className="create-post-header-item">Status</div>
      </div>
    );
  }
  }

  renderPost() {
    return(
      <div className="create-post">
        { this.renderHeader() }

        { this.renderSharedPost() }

        <div className="create-post-main">
          <div className="create-post-img-wrapper">
            <img src={this.props.currentUserAvatar || `/assets/avatar.jpg`} className="user-pic-xs" />
          </div>

          <div className="create-post-body">
            { this.renderForm()}
            { this.state.image_preview_url ? <img src={this.state.image_preview_url} className="timeline-side-bar-photo" /> : null}
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

import React from 'react';
import { connect } from 'react-redux';
import { createSinglePostRequest } from '../../actions/post_actions';

const mapDispatchToProps = dispatch => ({
  createSinglePostRequest: (postInfo) => dispatch(createSinglePostRequest(postInfo))
});

const mapStateToProps = (state) => ({
  currentUserAvatarUrl: state.auth.currentUser.avatar_url,
  friends: state.friends.friends,
  currentUserId: state.auth.currentUser.id
});

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.state = {
      postBody: '',
      bodyError: false
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
    const postInfo = {
      wall_id: this.props.profileId,
      body: this.state.postBody
    };
    this.props.createSinglePostRequest(postInfo).then(() => this.setState({bodyError: false, postBody: ''}));
  }

  renderForm(){
    return(
    <form className="create-post-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Whats on your mind?" className={`create-post-input-${this.state.bodyError}`}
          value={this.state.postBody} onChange={this.handleInput} />
    </form>
    );
  }

  renderPost() {
    return(
      <div className="create-post">
        <div className="create-post-header">
          <div className="create-post-header-item">Status</div>
          <div className="create-post-header-item">Photo</div>
          <div className="create-post-header-item">Video</div>
        </div>

        <div className="create-post-main">
          <div className="create-post-img-wrapper">
            <img src={this.props.currentUserAvatarUrl || `/assets/avatar.jpg`} className="user-pic-xs" />
          </div>

          <div className="create-post-body">
            { this.renderForm()}
          </div>
        </div>

        <div className="create-post-footer">
          <button type="button" className="create-post-button" onClick={this.handleSubmit}>Post</button>
        </div>

      </div>
    );
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
)(CreatePost);

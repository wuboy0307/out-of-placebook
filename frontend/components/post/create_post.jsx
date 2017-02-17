import React from 'react';
import { connect } from 'react-redux';
import { createSinglePostRequest } from '../../actions/post_actions';

const mapDispatchToProps = dispatch => ({
  createSinglePostRequest: (postInfo) => dispatch(createSinglePostRequest(postInfo))
});

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      postBody: ''
    };
  }

  handleInput(e) {
    this.setState({postBody: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const postInfo = {
      wall_id: this.props.profileId,
      body: this.state.postBody
    };
    this.props.createSinglePostRequest(postInfo).then(() => this.setState({postBody: ''}));
  }

  renderForm(){
    return(
    <form className="create-post-form" onSubmit={this.handleSubmit}>
      <textarea type="text" placeholder="Whats on your mind?" cols="40"
        rows="1" value={this.state.postBody} onChange={this.handleInput}></textarea>
    </form>
    );
  }

  render () {
    return(
      <div className="create-post">
        <div className="create-post-header">
          <div className="create-post-header-item">Status</div>
          <div className="create-post-header-item">Photo</div>
          <div className="create-post-header-item">Video</div>
        </div>

        <div className="create-post-main">
          <div className="create-post-img-wrapper">
            <img src="" className="user-pic-xs" />
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
}

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);

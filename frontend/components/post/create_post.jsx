import React from 'react';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm(){
    return(
    <form className="create-post-form">
      <textarea type="text" placeholder="Whats on your mind?" cols="40" rows="1"></textarea>
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
          <button type="button" className="create-post-button">Post</button>
        </div>

      </div>
    );
  }
}

export default CreatePost;

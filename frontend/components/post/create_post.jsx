import React from 'react';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm(){
    <form className="create-post-form">
      <input type="text" placeholder="Whats on your mind?"></input>
    </form>
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
            What's on your mind?
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;

import React from 'react';
import CommentItem from './comment_item';
import { connect } from 'react-redux';
import { createSingleCommentRequest } from '../../actions/post_actions';

const mapStateToProps = (state) => ({
  currentUserAvatarUrl: state.auth.currentUser.avatarXXS
});

const mapDispatchToProps = (dispatch) => ({
  createSingleCommentRequest: (comment) => dispatch(createSingleCommentRequest(comment))
});

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ''
    };
    this.renderLikes = this.renderLikes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps){
    if (newProps.selected) {
      this.nameInput.select();
    }
  }


  renderLikes() {
    const numLikes = this.props.numLikes;
    const userLikes = this.props.currentUserLikes;
    let computedText;

     if (userLikes && numLikes === 1) {
      computedText = "You like this.";
    } else if (userLikes && numLikes === 2) {
      computedText = `You and ${this.props.likeText.slice(0,-12)} like this.`;
    } else if (userLikes && numLikes > 2) {
      computedText = `You, ${this.props.likeText}`;
    } else {
      computedText = this.props.likeText;
    }


    if (numLikes > 0) {
      return(
        <div className="comment-box-activity">
          {computedText}
        </div>
      );
    } else {
      return null;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let comment = {
      post_id: this.props.postId,
      body: this.state.commentText
    };
    this.props.createSingleCommentRequest(comment)
      .then(() => {
        this.setState({commentText: ''});
        this.nameInput.scrollIntoView();
      });
  }

  handleChange(e){
    this.setState({commentText: e.target.value});
  }

  render() {
    return(
      <div className="comment-box">
        { this.renderLikes() }

        { this.props.comments.map(comment => <CommentItem key={comment.id} parentComment={comment} postId={this.props.postId}/>)}

        <div className="comment-reply">
          <div className="comment-reply-body">
            <img className="user-pic-xxs" src={this.props.currentUserAvatarUrl || `/assets/avatar.jpg`} />
            <form className="comment-reply-form" onSubmit={this.handleSubmit}>
              <input type="text" className="comment-reply-input"
                ref={(input) => { this.nameInput = input; }}
                placeholder="Write a comment..." onChange={this.handleChange} value={this.state.commentText}/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);

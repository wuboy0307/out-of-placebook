import React from 'react';
import { connect } from 'react-redux';
import { toggleFlyout } from '../../actions/flyout_actions';
import CreatePost from '../post/create_post';
import { fetchSingleSharedPostRequest } from '../../actions/post_actions';

const mapStateToProps = state => ({
  flyout: state.flyout.flyout,
  data: state.flyout.data
});

const mapDispatchToProps = dispatch => ({
  fetchSingleSharedPostRequest: (postInfo) => dispatch(fetchSingleSharedPostRequest(postInfo))
});

class Modal extends React.Component {
  constructor(props){
    super(props);
    this.renderSharePost = this.renderSharePost.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
    console.log('inner modal');
  }

  renderSharePost() {
    if (!this.props.data) return null;
    if (this.props.data.type === "sharepost") {
      return(<CreatePost sharedPost={this.props.data.data}/>);
    } else {
      return null;
    }
  }

  render(){
    if (this.props.flyout === 'modal') {
    return(
      <div className="modal-container">
        <div className="modal" onClick={this.stopPropagation}>
          { this.renderSharePost() }
        </div>
      </div>
    );
  }
  else {
    return null;
  }
}

}
// switch(this.flyout) {
//   case 'share':
//   return <div className="sharediv"></div>;
//
//     default:
//     return null;
//   }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

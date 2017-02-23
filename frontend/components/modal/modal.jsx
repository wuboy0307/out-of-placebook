import React from 'react';
import { connect } from 'react-redux';
import { toggleFlyout } from '../../actions/flyout_actions';
import CreatePost from '../post/create_post';

const mapStateToProps = state => ({
  flyout: state.flyout,
});
class Modal extends React.Component {
  constructor(props){
    super(props);
  }

  stopPropagation(e) {
    e.stopPropagation();
    console.log('inner modal');
  }

  render(){
    if (this.props.flyout === 'modal') {
    return(
      <div className="modal-container">
        <div className="modal" onClick={this.stopPropagation}>
          <CreatePost />
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
  null
)(Modal);

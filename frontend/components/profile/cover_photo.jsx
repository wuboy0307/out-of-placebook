import React from 'react';

class CoverPhoto extends React.Component {
   coverPicRollover() {
     if (this.props.profile.id === this.props.currentUser.id) {
       return (<div className="cover-picture-change">Update Cover Photo</div>);
     } else {
       return null;
     }
   }

  render () {
    return(
        <div className="cover-photo" onClick={this.props.callback}>
          { this.coverPicRollover() }
          <img src={this.props.photoUrl} />
        </div>
    );
  }
}

export default CoverPhoto;

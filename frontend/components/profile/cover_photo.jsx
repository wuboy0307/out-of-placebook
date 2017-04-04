import React from 'react';

class CoverPhoto extends React.Component {
   coverPicRollover() {
     if (this.props.profile.id === this.props.currentUser.id) {
       return (
         <div className="cover-picture-container">
           <i className="fa fa-camera" aria-hidden="true"></i>
           <div className="cover-picture-change">
             <span className="cover-change-text">
               Update Cover Photo
             </span>
           </div>
         </div>);
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

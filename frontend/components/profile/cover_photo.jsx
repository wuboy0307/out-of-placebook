import React from 'react';

class CoverPhoto extends React.Component {
  render () {
    return(
      <div>
        <img className="cover-photo" src={ this.props.photoUrl || `/assets/coverphoto.jpg`} />
      </div>
    );
  }
}

export default CoverPhoto;

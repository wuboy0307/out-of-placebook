import React from 'react';

class CoverPhoto extends React.Component {
  render () {
    return(
        <img className="cover-photo"
          src={ this.props.photoUrl} onClick={this.props.callback}/>
    );
  }
}

export default CoverPhoto;

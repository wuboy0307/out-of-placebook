import React from 'react';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class ProfileLinkBar extends React.Component {
  render () {
    return(
      <div className="profile-link-bar">

        { ['timeline', 'friends', 'photos'].map((page) => (
          <div
            className={this.props.currentPage === page ? 'current-page link-item' : 'link-item'}
            key={page}
            onClick={() => this.props.selectPage(page)}>
            {page.capitalize()}
          </div>
        )) }
      </div>
    );
  }
}

export default ProfileLinkBar;

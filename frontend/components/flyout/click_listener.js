import React from 'react';
import { connect } from 'react-redux';

import { toggleFlyout } from '../../actions/flyout_actions';

class ClickListener extends React.Component {
  constructor(props) {
    super(props);
    this.windowClick = this.windowClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.windowClick);
  }

  windowClick(e) {
    // If we click anywhere except the Flyout, we want to close the Flyout.
    if (this.props.isFlyoutActive) {
      this.props.toggleFlyout(null);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  isFlyoutActive: state.flyout.flyout !== null,
});

export default connect(
  mapStateToProps,
  { toggleFlyout }
)(ClickListener);

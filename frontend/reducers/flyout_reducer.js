import { TOGGLE_FLYOUT } from '../actions/flyout_actions';

const flyoutReducer = (oldState = null, action) => {
  switch (action.type) {
    case TOGGLE_FLYOUT:
      // If we clicked the same button that opened the flyout, it should close.
      const newFlyoutValue =  action.flyout !== oldState ? action.flyout : null;

      return newFlyoutValue;

    default:
      return oldState;
  }
};

export default flyoutReducer;

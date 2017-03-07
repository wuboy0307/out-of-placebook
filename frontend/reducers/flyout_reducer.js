import { TOGGLE_FLYOUT } from '../actions/flyout_actions';

const _initialState = {
  flyout: null
}

const flyoutReducer = (oldState = _initialState, action) => {
  switch (action.type) {
    case TOGGLE_FLYOUT:
      // Clicking the same button that opened the flyout should close it
      const newFlyoutValue =  action.flyout !== oldState.flyout ? action.flyout : null;
      const newState = {
        flyout: newFlyoutValue,
        data: action.data
      };
      return newState;

    default:
      return oldState;
  }
};

export default flyoutReducer;

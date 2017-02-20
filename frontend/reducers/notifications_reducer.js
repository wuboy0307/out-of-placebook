import merge from 'lodash/merge';
import { FETCH_NOTIFICATION_COUNT_SUCCESS } from '../actions/notification_actions';

const notificationsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case FETCH_NOTIFICATION_COUNT_SUCCESS:
      newState = merge({}, oldState);
      newState.count = action.count.notification_count;
      return newState;
    default:
      return oldState;
  }
};

export default notificationsReducer;
